/**
 * 本方案与常规虚拟列表的实现最大的不同在于：
 *  - 常规虚拟列表是一次性获取了所有数据，内存占用随着数据总量上升而上升
 *  - 本方案是‘按需预获取’一定数量的数据。‘按需’是为了节省内存占用，‘预获取’是为了滚动的顺畅性。内存占用小且不随着数据总量上升而上升
 *
 * 假设我的数据是 100W 条
 * 容器可视高度最多显示 20 条数据
 * 那么预先获取 2000 条数据（可根据实际情况动态调整）
 */

const list = Array(1000000).fill(1).map((_, i) => {
    return {
        id: i + 1,
        text: `第${i + 1}条数据`,
    }
});

class VirtualListManager {
    constructor() {
        return this;
    }

    preloadCount = 20; // 预获取的条数
    screenHeight = 0; // 容器高度
    total = 0; // 总条数
    items = []; // 按需获取到的列表数据
    itemHeight = 10; // 每条数据的高度
    scrollTop = 0; // 滚动距离
    fetchStartIndex = 0; // 预获取的数组开始索引
    fetchEndIndex = 0; // 预获取的数组结束索引

    init(screenHeight = 100, itemHeight = 10) {
        this.screenHeight = screenHeight;
        this.itemHeight = itemHeight;
    }

    get totalHeight() {
        return this.total * this.itemHeight;
    }

    get translateY() {
        return this.scrollTop - this.scrollTop % this.itemHeight;
    }

    get startIndex() {
        return Math.floor(this.scrollTop / this.itemHeight);
    }

    get showListCount() {
        return Math.ceil(this.screenHeight / this.itemHeight);
    }

    get showList() {
        const { startIndex, fetchStartIndex, showListCount, items } = this;
        const index = startIndex - fetchStartIndex;
        // +1 因为 Array.slice() endIndex 不包括;
        const showList = items.slice(index, index + showListCount + 1);
        return showList.length ? showList : Array(showListCount).fill(1).map((_, i) => ({ id: i + 1, text: 'loading...' }));
    }

    getFetchIndex() {
        const start = Math.max(0, this.startIndex - this.preloadCount);
        const end = Math.min(this.total, this.startIndex + this.showListCount + this.preloadCount);
        return [start, end];
    }

    // TODO: 可以加 throttle
    fetchItem() {
        const [fetchStartIndex, fetchEndIndex] = this.getFetchIndex();
        // 模拟异步获取数据
        this.timerId && clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            this.total = list.length;
            this.items = list.slice(fetchStartIndex, fetchEndIndex);
            this.fetchStartIndex = fetchStartIndex;
            this.fetchEndIndex = fetchEndIndex;
            console.log('fetchItem');
        }, 100);
    }

    handleScroll(e) {
        requestAnimationFrame(() => {
            const { scrollTop } = e.target;
            if (scrollTop + this.screenHeight > this.totalHeight) {
                console.log('到底了');
                return;
            }
            this.scrollTop = scrollTop;
            const isClose2Start = this.startIndex < this.fetchStartIndex + (this.preloadCount / 2);
            const isClose2End = this.startIndex + this.showListCount > this.fetchEndIndex - (this.preloadCount / 2);
            if (isClose2Start && this.fetchStartIndex) {
                this.fetchItem();
            } else if (isClose2End && this.fetchEndIndex !== this.total) {
                this.fetchItem();
            }
        });
    }
}

export default VirtualListManager;

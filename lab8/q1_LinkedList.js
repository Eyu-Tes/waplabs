function Node(data, next){
    this.data = data;
    this.next = null;
}

function LinkedList(){
    this.head = null;
    this.size = 0;
}

LinkedList.prototype.remove = function (data) {
    if (!this.head) {
        return;
    }

    if (this.head.data === data) {
        this.head = this.head.next;
        return;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
        current = current.next;
    }

    if (current.next && current.next.data === data) {
        current.next = current.next.next;
    }
};

LinkedList.prototype.add = function(data){
    let node = new Node(data);
    if(!this.head){
        this.head = node;
        this.size = 1;
    }else {
        // traverse
        let current = this.head;
        while (current.next){
            current = current.next;
        }
        current.next = node;
        this.size++;
    }

}

LinkedList.prototype.print = function () {
    let current = this.head;
    let result = "LinkedList{";
    while (current) {
        result += current.data;
        if (current.next) {
            result += ",";
        }
        current = current.next;
    }
    result += "}";
    console.log(result);
};


let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
linkedlist.print();
linkedlist.remove(2);
linkedlist.print();
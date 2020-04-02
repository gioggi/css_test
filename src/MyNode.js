class MyNode {
    constructor(node, children, parent) {
        this.data = node;
        this.__children = children;
        this.__parent = parent;

        if (!document.getElementById("root")) {
            let createRootDiv = document.createElement("div");
            createRootDiv.id = "root";
            document.body.appendChild(createRootDiv);
            this.data = createRootDiv;
        }
    }

    addNode(obj) {
        let node = document.createElement("div");
        if (obj) {
            node.id = obj.data;
        }

        if (this.data) {
            this.data.appendChild(node);
        } else {
            document.getElementById("root").appendChild(node);
        }

        let newParent = node.parentNode;

        //allows chaining
        return new MyNode(node, null, newParent);
    }

    getNodeAt(p) {
        let selectedNode = [...this.data.children][p];
        if (selectedNode) {
            return new MyNode(selectedNode);
        }
    }

    maxDepth() {
        function getDepth(node, depth = 0) {
            if (!!node.children && node.children.length > 0) {
                var childDepths = [];
                depth++;

                for (var i = 0; i < node.children.length; i++) {
                    childDepths.push(getDepth(node.children[i]));
                }
                return depth + Math.max(...childDepths);
            }

            return depth;
        }
        return getDepth(this.data);
    }

    parent() {
        if (this.__parent.id !== "root") {
            return new MyNode(
                this.__parent,
                [...this.__parent.children],
                this.__parent.parentNode
            );
        } else {
            return new MyNode(null, [...this.__parent.children], null);
        }
    }
}

class MyTree {
    constructor() {
        this.root = new MyNode();
    }
}

let tree = new MyTree();
var firstNode = tree.root.addNode();
var secondNode = tree.root.addNode();

firstNode.addNode().addNode({ data: "leaf1" });
firstNode.getNodeAt(0).addNode({ data: "leaf2" });
tree.root;

console.log(tree.root.maxDepth());
console.log(firstNode.maxDepth());
console.log(secondNode.maxDepth());
console.log(firstNode.parent());

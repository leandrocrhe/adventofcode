const fs = require('fs');

class TreeDirectory {
  constructor(name = '/', parent = '/', data = 0) {
    this.data = data;
    this.name = name;
    this.parent = parent;
    this.children = [];
    this.files = {};
  }

  addChild(obj) {
    this.children.push(obj);
  }

  addData(number) {
    this.data += parseInt(number);
  }

  addFile(file, size) {
    this.files[file] = parseInt(size);
  }

  lookNode(name, children = this.children) {
    if (this.name === name) {
      return this;
    }

    for (let node of children) {
      if (node.name === name) {
        return node;
      } else if (node.children.length > 0) {
        const result = node.lookNode(name, node.children);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  recalculateTotals(children = this.children) {
    for (let node of children) {
      if (node.children.length > 0) {
        this.data += node.recalculateTotals(node.children);
      } else {
        this.data += node.data;
      }
    }

    return this.data;
  }

  remainingDir(rest, children = this.children) {
    if (this.data - rest < 0) {
      return null;
    } else {
      let minData = this.data;
      for (let node of children) {
        if (node.children.length > 0) {
          const minNode = node.remainingDir(rest, node.children);
          if (minNode !== null && minNode < minData) {
            minData = minNode;
          }
        } else if (node.data - rest > 0 && node.data < minData) {
          minData = node.data;
        }
      }
      return minData;
    }
  }

  calculateTotal(children = this.children) {
    let total = 0;
    if (this.data <= 100000) {
      total = this.data;
    }

    for (let node of children) {
      if (node.children.length > 0) {
        total += node.calculateTotal(node.children);
      } else {
        if (node.data <= 100000) {
          total += node.data;
        }
      }
    }

    return total;
  }

  toString() {
    return this.name;
  }
}

class DirectorySize {
  extractData() {
    try {
      const inputFile = fs.readFileSync('file_input.txt', 'utf8');
      return inputFile.replace(/\r/g, '').trim().split('\n');
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  seekFileSystem() {
    try {
      const tree = new TreeDirectory();
      let flag = '';

      for (let item of this.extractData()) {
        if (item.includes('$')) {
          if (item.includes('cd')) {
            const [symbol, command, directory] = item.split(' ');
            if (directory.includes('..')) {
              const nodeObj = tree.lookNode(flag);
              flag = nodeObj.parent;
            } else {
              if (!directory.includes('/')) {
                flag = flag + directory.trim() + '/';
              } else {
                flag = directory.trim();
              }
            }
          }
        } else if (item.includes('dir')) {
          const [command, nodeName] = item.split(' ');
          const node = new TreeDirectory(`${flag}${nodeName}/`.replace('\n', '').trim(), flag);
          const nodeObj = tree.lookNode(flag);
          nodeObj.addChild(node);
        } else {
          const [number, file] = item.split(' ');
          if (!isNaN(number.trim())) {
            const nodeObj = tree.lookNode(flag);
            nodeObj.addData(number.trim());
            nodeObj.addFile(file, number.trim());
          }
        }
      }

      tree.recalculateTotals();
      const remaining = tree.remainingDir(30000000 - (70000000 - parseInt(tree.data)));
      console.log(remaining !== null ? remaining : 0);
    } catch (error) {
      console.error(error);
    }
  }
}

const directorySize = new DirectorySize();
directorySize.seekFileSystem();

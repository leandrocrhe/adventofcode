const fs = require('fs');

class Directory {
  constructor(name = '/', parent = null, size = 0) {
    this.size = size;
    this.name = name;
    this.parent = parent;
    this.children = [];
    this.files = {};
  }

  addChild(directory) {
    this.children.push(directory);
  }

  addSize(size) {
    this.size += parseInt(size);
  }

  addFile(file, fileSize) {
    this.files[file] = parseInt(fileSize);
  }

  findDirectory(name, children = this.children) {
    if (this.name === name) {
      return this;
    }

    for (let child of children) {
      if (child.name === name) {
        return child;
      } else if (child.children.length > 0) {
        const result = child.findDirectory(name, child.children);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  recalculateTotalSize(children = this.children) {
    for (let child of children) {
      if (child.children.length > 0) {
        this.size += child.recalculateTotalSize(child.children);
      } else {
        this.size += child.size;
      }
    }

    return this.size;
  }

  calculateTotalSize(children = this.children) {
    let totalSize = 0;
    if (this.size <= 100000) {
      totalSize = this.size;
    }

    for (let child of children) {
      if (child.children.length > 0) {
        totalSize += child.calculateTotalSize(child.children);
      } else {
        if (child.size <= 100000) {
          totalSize += child.size;
        }
      }
    }

    return totalSize;
  }
}

class DirectorySize {
  readInputFile() {
    try {
      const inputFile = fs.readFileSync('file_input.txt', 'utf8');
      return inputFile.replace(/\r/g, '').trim().split('\n');
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return [];
    }
  }

  processFileSystem() {
    try {
      const root = new Directory();
      let currentDirectory = root;

      for (let item of this.readInputFile()) {
        if (item.startsWith('$')) {
          if (item.includes('cd')) {
            const [symbol, command, directory] = item.split(' ');
            if (directory.includes('..')) {
              currentDirectory = currentDirectory.parent || root;
            } else {
              if (!directory.includes('/')) {
                const directoryName = `${currentDirectory.name}${directory.trim()}/`;
                const newDirectory = new Directory(directoryName, currentDirectory);
                currentDirectory.addChild(newDirectory);
                currentDirectory = newDirectory;
              } else {
                currentDirectory = root;
              }
            }
          }
        } else if (item.includes('dir')) {
          const [command, directoryName] = item.split(' ');
          const directoryPath = `${currentDirectory.name}${directoryName.trim()}/`;
          const directoryNode = new Directory(directoryPath, currentDirectory);
          currentDirectory.addChild(directoryNode);
        } else {
          const [size, file] = item.split(' ');
          if (!isNaN(size.trim())) {
            currentDirectory.addSize(size.trim());
            currentDirectory.addFile(file, size.trim());
          }
        }
      }

      root.recalculateTotalSize();
      console.log(root.calculateTotalSize());
    } catch (error) {
      console.error(error);
    }
  }
}

const directorySize = new DirectorySize();
directorySize.processFileSystem();
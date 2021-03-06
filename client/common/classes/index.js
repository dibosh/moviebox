import _ from 'lodash';

class File {
  constructor(path, parentDir, isDir) {
    this.path = path;
    this.name = path !== '/' ? path.replace(/^.*[\\/]/, '') : 'home';
    this.extension = !isDir ? this.name.substr(this.name.lastIndexOf('.') + 1) : '';
    this.parent = parentDir;
    this.isDirectory = Boolean(isDir);
  }
}


class Directory extends File {
  constructor(path, parentDir) {
    super(path, parentDir, true);
    this._files = [];
  }

  set files(files) {
    this._files = files;
  }

  get files() {
    return this._files;
  }
}

class FileTree {
  set root(root) {
    this._root = root;
  }

  get root() {
    return this._root;
  }

  set currentNode(current) {
    this._current = current;
  }

  get currentNode() {
    return this._current;
  }

  static clone(fileTree) {
    let cloned = new FileTree();
    cloned.root = new Directory(fileTree.root.path, fileTree.root.parent);
    cloned.currentNode = new Directory(fileTree.currentNode.path, fileTree.currentNode.parent);

    return cloned;
  }

  static createInstanceFromJSON(fileTreeJSON) {
    if (_.isEmpty(fileTreeJSON)) {
      return;
    }

    let fileTree = new FileTree();

    if (_.has(fileTreeJSON, '_root')) {
      fileTree.root = fileTreeJSON._root;
    }

    _.each(['_current', '_previous'], (key) => {
      if (_.has(fileTreeJSON, key)) {
        fileTree[key.replace('_', '') + 'Node'] = fileTreeJSON[key];
      }
    });

    return fileTree;
  }

  static getPathTraversalFromCurrentNode(fileTree) {
    let traversal = [];
    let currentNode = fileTree.currentNode;
    traversal.push(currentNode);

    while (currentNode.parent) {
      traversal.push(currentNode.parent);
      currentNode = currentNode.parent;
    }

    return traversal.reverse();
  }
}

class MovieInfo {
  get resolution() {
    return this._resolution;
  }

  set resolution(value) {
    this._resolution = value;
  }

  get quality() {
    return this._quality;
  }

  set quality(value) {
    this._quality = value;
  }

  get year() {
    return this._year;
  }

  set year(value) {
    this._year = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  set poster(posterUrl) {
    this._poster = posterUrl;
  }

  get poster() {
    return this._poster;
  }
}

export {File, Directory, FileTree, MovieInfo};

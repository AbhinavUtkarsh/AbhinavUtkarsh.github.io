import EMOGA from './images/EMOGA.png';
import ROS2 from './images/ROS_2.png';

// Paths in Projects.json are plain strings, which the bundler cannot resolve,
// so they map to real imports here.
const REGISTRY = {
  './images/EMOGA.png': EMOGA,
  './images/ROS_2.png': ROS2,
};

export function projectImage(path) {
  return path ? REGISTRY[path] || null : null;
}

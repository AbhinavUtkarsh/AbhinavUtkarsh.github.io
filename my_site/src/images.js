import EMOGA from './images/EMOGA.png';
import ROS2 from './images/ROS_2.png';

// Paths in Projects.json are plain strings, which the bundler cannot resolve,
// so they map to real imports here. The sizes let the browser reserve space
// before the image loads, otherwise the page shifts under your thumb as you
// scroll and taps land on the wrong thing.
const REGISTRY = {
  './images/EMOGA.png': { src: EMOGA, width: 473, height: 672 },
  './images/ROS_2.png': { src: ROS2, width: 514, height: 505 },
};

export function projectImage(path) {
  return path ? REGISTRY[path] || null : null;
}

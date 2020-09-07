/**
 * Constants to be used by caches.
 */
class CacheConstant {

  // 60 minutes
  get mediumExpiryTimeInterval() {
    return 3600;
  }

  // 1 day
  get largeExpiryTimeInterval() {
    return 86400;
  }
}

module.exports = new CacheConstant();
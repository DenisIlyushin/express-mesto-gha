class ExtendedError extends Error {
  constructor(message, details = null) {
    super(message);
    this.details = details || 'Без дополнительных сведений';
  }
}

module.exports = ExtendedError;

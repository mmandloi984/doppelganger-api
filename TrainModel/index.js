const df = require('durable-functions');

module.exports = df(function*(context) {
  context.log('Starting chain sample');
  const output = [];
  const actor = 'Gandalf';
  try {
    const images = yield context.df.callActivityAsync(
      'SearchBingActivity',
      actor
    );

    const tag = yield context.df.callActivityAsync('GetTagActivity', actor);
    const bla = yield context.df.callActivityAsync('CreateImagesActivity', {
      id: tag.id,
      urls: images
    });
    context.log(bla);
  } catch (error) {
    context.log(error);
  }

  return output;
});

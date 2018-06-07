import R from 'ramda';
import { Newsletter } from '../services/api';

const { registerNewsletter } = Newsletter;

export const stageNewsletterSignUp = R.curry((step, that, next) => {
  if (that.isAlreadyDone(next, step)) { return null; }
  return that.block(() => {
    return registerNewsletter(that.payload('NEWSLETTER_SIGNUP'))
      .then(res => {
        that.unblock();
        that.incrementPipelineStep();
        next(null);
      })
      .catch(err => {
        that.unblock();
        next(err);
      });
  });
});

export default {
  stageNewsletterSignUp,
};

import {execa} from 'execa';

const debug = false;
main(debug);

async function main(_debug) {
  try {
    // await execa( 'lint-prepush', { stdio: 'inherit' } );
    // console.log('[PRE-PUSH]: finished running lint-prepush');
    debug && console.log('[DEBUG] pre-push not implimented');

    // validate-type before push
    await execa(
      'node',
      ['common/scripts/install-run-rush.js', 'validate-type'],
      { stdio: 'inherit' }
    );
    console.log('[PRE-PUSH] Finished validate typescript');
  } catch (_err) {
    if (debug) {
      console.log('[DEBUG] in catch start -----------------------');
      console.log(_err);
      console.log('[DEBUG] in catch end ^^^^^^^^^^^^^^^^^^^^^^');
    }
    console.log(_err.shortMessage);
    process.exit(1);
  }
}

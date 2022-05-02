import {execa} from 'execa';

const debug = false;
main(debug);

async function main(_debug) {
  try {
    await execa( 'lint-staged', { stdio: 'inherit' } );
    console.log('[PRE-COMMIT] Finished running lint-staged on staged typescript file');
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

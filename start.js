import { exec } from 'child_process';

// Get the argument from the command line
const scriptNumber = process.argv[2];

if (
  !scriptNumber ||
  isNaN(scriptNumber) ||
  scriptNumber < 1 ||
  scriptNumber > 25
) {
  console.error('Please provide a valid script number between 1 and 25.');
  process.exit(1);
}

const scriptFile = `${scriptNumber}.js`;

exec(`node ${scriptFile}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing ${scriptFile}:`, err);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(`${stdout}`);
});

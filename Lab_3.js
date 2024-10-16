const fs = require('fs');
const commander = require('commander');

const program = new commander.Command();

program
  .requiredOption('-i, --input <path>', 'path to the input JSON file')
  .option('-o, --output <path>', 'path to the output file')
  .option('-d, --display', 'display the result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

let data;

try {
  const jsonString = fs.readFileSync(options.input);
  data = JSON.parse(jsonString);
} catch (err) {
  console.error("Cannot find input file");
  process.exit(1);
}

if (data && Array.isArray(data)) {
  const minAsset = data.reduce((prev, curr) => {
    return (prev.value < curr.value) ? prev : curr;
  });

  const result = `${minAsset.txt}: ${minAsset.value}`;

  if (options.display) {
    console.log(result);
  }

  if (options.output) {
    fs.writeFileSync(options.output, result);
  }
} else {
  console.error("No valid data found in input file");
}

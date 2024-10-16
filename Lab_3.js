// index.js

const fs = require('fs');
const { program } = require('commander');

// Налаштування командного рядка
program
  .option('-i, --input <path>', 'шлях до файлу для читання (обовʼязковий параметр)')
  .option('-o, --output <path>', 'шлях до файлу для запису (необовʼязковий параметр)')
  .option('-d, --display', 'вивести результат у консоль (необовʼязковий параметр)')
  .parse(process.argv);

// Отримуємо значення параметрів
const options = program.opts();

// Перевірка наявності обовʼязкового параметра
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// Перевірка наявності файлу для читання
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Читання JSON файлу
const jsonData = fs.readFileSync(options.input, 'utf8');
const data = JSON.parse(jsonData);

// Якщо задані необовʼязкові параметри
if (options.display) {
  console.log(data);
}

if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(data, null, 2));
  
  // Виводимо результат і у файл, і у консоль
  if (options.display) {
    console.log(data);
  }
}

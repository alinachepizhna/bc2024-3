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
let data;
try {
  const jsonData = fs.readFileSync(options.input, 'utf8');
  data = JSON.parse(jsonData);
} catch (err) {
  console.error("Cannot parse JSON from input file", err.message);
  process.exit(1);
}

// Перевірка, чи є валідні активи
const validAssets = data.filter(asset => asset.value !== undefined && asset.value !== null);

// Якщо не знайдено валідних активів
if (validAssets.length === 0) {
  const result = "Інші резервні активи: 0";
  
  // Виведення результату у консоль, якщо задано
  if (options.display) {
    console.log(result);
  }

  // Запис результату у файл, якщо задано
  if (options.output) {
    fs.writeFileSync(options.output, result);
  }
  process.exit(0); // Завершаем выполнение
}

// Знаходження активу з мінімальним значенням
const minAsset = validAssets.reduce((prev, curr) => {
  return (prev.value < curr.value) ? prev : curr;
});

// Формування результату
const result = `${minAsset.txt}: ${minAsset.value}`;

// Виведення результату у консоль, якщо задано
if (options.display) {
  console.log(result);
}

// Запис результату у файл, якщо задано
if (options.output) {
  fs.writeFileSync(options.output, result);
}

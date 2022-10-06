const gerarCsv = (data, atributoFinal, filename) => {
  const header = "Timestamp, " + atributoFinal
  
  let csv = header + '\n'
  console.log(data)

  data.forEach(item => {
    csv += item.x + ',' + item.y + '\n'
  })

  const hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = filename;
  hiddenElement.click();
}

export default gerarCsv
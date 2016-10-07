module.exports = function (results) {
  results = results || []
  console.log(JSON.stringify(results, null, '\t'))

  let output = []

  const ok = '✓'
  const warn = '⚡'
  const err = '✗'
  const stylesMap = {
    bold: [1, 22],
    yellow: [33, 39],
    green: [32, 39],
    red: [31, 39]
  }

  function stylize (message) {
    let styles = arguments.length >= 2 ? [].slice.call(arguments, 1) : []
    return styles.reduce(function (m, s) {
      return '\u001b[' + stylesMap[s][0] + 'm' + m + '\u001b[' + stylesMap[s][1] + 'm'
    }, message)
  }

  function pluralize (word, count) {
    return count === 1 ? word : word + 's'
  }

  function reportSummary (result) {
    let prefix, status, color
    if (result.errorCount > 0) {
      prefix = err
      status = 'Error!'
      color = 'red'
    } else if (result.warningCount > 0) {
      prefix = warn
      status = 'Warning!'
      color = 'yellow'
    } else {
      prefix = ok
      status = 'Ok!'
      color = 'green'
    }
    return prefix + ' ' + stylize(status, color, 'bold') +
      ' » ' + result.errorCount + ' ' + pluralize('error', result.errorCount) +
      ' and ' + result.warningCount + ' ' + pluralize('warning', result.warningCount) +
      ' in ' + result.fileCount + ' ' + pluralize('file', result.fileCount)
  }

  function reportFile (result) {
    let prefix, color
    if (result.errorCount > 0) {
      prefix = err
      color = 'red'
    } else if (result.warningCount > 0) {
      prefix = warn
      color = 'yellow'
    } else {
      prefix = ok
      color = 'green'
    }
    return '  ' + prefix + ' ' + stylize(result.filePath, color, 'bold')
  }

  function reportMessage (result) {
    let prefix, color
    if (result.severity === 2) {
      prefix = err
      color = 'red'
    } else if (result.severity === 1) {
      prefix = warn
      color = 'yellow'
    } else {
      prefix = ok
      color = 'green'
    }
    return '     ' + prefix + ' ' + stylize('#' + result.line, color) +
      ': ' + stylize(result.message)
  }

  var summary = results.reduce(function (sum, result) {
    sum.errorCount += result.errorCount
    sum.warningCount += result.warningCount
    return sum
  }, { errorCount: 0, warningCount: 0, fileCount: results.length })

  results.forEach(function (result) {
    output.push(reportFile(result))
    result.messages.forEach((msg) => output.push(reportMessage(msg)))
    output.push('')
  })

  output.push(reportSummary(summary))

  return output.join('\n')
}

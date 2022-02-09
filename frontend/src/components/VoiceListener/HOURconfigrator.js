const HOURconfigrator = (hour, half) => {
  console.log(`hourCoNfigaraitor hour to dispatch :${hour}`)
  if (
    hour === '7' ||
    (hour === 'שבע' && half === '') ||
    (hour === '7' && half === '')
  ) {
    return '7:00'
  } else if (
    hour === '7:30' ||
    (hour === 'שבע' && half === 'וחצי') ||
    (hour === '7' && half === 'וחצי')
  ) {
    return '7:30'
  } else if (
    hour === 8 ||
    hour === 'שמונה' ||
    hour === '8' ||
    (hour === '8' && half === '') ||
    (hour === '8:00' && half === '') ||
    (hour === 'שמונה' && half === '')
  ) {
    return '8:00'
  } else if (
    hour === '8:30' ||
    (hour === '8' && half === 'וחצי') ||
    (hour === 'שמונה' && half === 'וחצי')
  ) {
    return '8:30'
  } else if (
    hour === '9:00' ||
    hour === '9' ||
    (hour === 'תשע' && half === '') ||
    (hour === '9' && half === '') ||
    (hour === '9:00' && half === '')
  ) {
    return '9:00'
  } else if (
    hour === '9:30' ||
    (hour === '9' && half === 'וחצי') ||
    (hour === 'תשע' && half === 'וחצי') ||
    (hour === '9:00' && half === 'וחצי')
  ) {
    return '9:30'
  } else if (
    hour === '10:00' ||
    hour === 'עשר' ||
    hour === '10' ||
    (hour === 'עשר' && half === '') ||
    (hour === '10:00' && half === '') ||
    (hour === '10' && half === '')
  ) {
    return '10:00'
  } else if (
    hour === '10:30' ||
    (hour === '10' && half === 'וחצי') ||
    (hour === '10:00' && half === 'וחצי') ||
    (hour === 'עשר' && half === 'וחצי')
  ) {
    return '10:30'
  } else if (
    hour === '11:00' ||
    hour === '11' ||
    (hour === '11' && half === '') ||
    (hour === 'אחד' && half === 'עשרה') ||
    (hour === 'אחת' && half === 'עשרה') ||
    (hour === '1' && half === 'עשרה') ||
    (hour === '11:00' && half === '')
  ) {
    return '11:00'
  } else if (
    hour === '11:30' ||
    (hour === '11' && half === 'וחצי') ||
    (hour === '11:00' && half === 'וחצי')
  ) {
    return '11:30'
  } else if (
    hour === '12:00' ||
    (hour === '12:00' && half === '') ||
    (hour === '12' && half === '') ||
    (hour === 'שניים' && half === 'עשרה') ||
    (hour === 'שתיים' && half === 'עשרה') ||
    (hour === '2' && half === 'עשרה')
  ) {
    return '12:00'
  } else if (
    hour === '12:30' ||
    (hour === '12' && half === 'וחצי') ||
    (hour === '12:00' && half === 'וחצי')
  ) {
    return '12:30'
  } else if (
    hour === '13:00' ||
    hour === '1:00' ||
    (hour === '1' && half === '') ||
    (hour === '1' && !half) ||
    (hour === 'אחת' && half === '') ||
    (hour === 'אחת' && !half) ||
    (hour === 'אחד' && half === '') ||
    (hour === 'אחד' && !half)
  ) {
    return '13:00'
  } else if (
    hour === '13:30' ||
    hour === '1:30' ||
    (hour === '1' && half === 'וחצי') ||
    (hour === 'אחת' && half === 'וחצי') ||
    (hour === 'אחד' && half === 'וחצי')
  ) {
    return '13:30'
  } else if (
    hour === '14:00' ||
    hour === '2:00' ||
    (hour === '2' && half === '') ||
    (hour === 'שתיים' && half === '') ||
    (hour === 'שניים' && half === '')
  ) {
    return '14:00'
  } else if (
    hour === '14:30' ||
    hour === '2:30' ||
    (hour === '2' && half === 'וחצי') ||
    (hour === 'שתיים' && half === 'וחצי') ||
    (hour === 'שניים' && half === 'וחצי')
  ) {
    return '14:30'
  } else if (
    hour === '15:00' ||
    (hour === '3' && half === '') ||
    (hour === 'שלוש' && half === '') ||
    hour === '3:00' ||
    (hour === '3:00' && half === '') ||
    (hour === '3:00' && !half)
  ) {
    return '15:00'
  } else if (
    hour === '15:30' ||
    hour === '3:30' ||
    (hour === 'שלוש' && half === 'וחצי') ||
    (hour === '3' && half === 'וחצי') ||
    (hour === '3' && half === 'ושלושים') ||
    (hour === 'שלוש' && half === 'ושלושים')
  ) {
    return '15:30'
  } else if (
    hour === '16:00' ||
    hour === '4:00' ||
    hour === '4' ||
    (hour === 'ארבע' && half === '') ||
    (hour === 'ארבע' && !half) ||
    (hour === 'ארבעה' && half === '') ||
    (hour === 'ארבעה' && !half) ||
    (hour === '4:00' && half === '')
  ) {
    return '16:00'
  } else if (
    hour === '16:30' ||
    hour === '4:30' ||
    (hour === 'ארבע' && half === 'וחצי') ||
    (hour === '4' && half === 'וחצי') ||
    (hour === '4' && half === 'ושלושים') ||
    (hour === 'ארבע' && half === 'ושלושים')
  ) {
    return '16:30'
  } else if (
    hour === '17:00' ||
    (hour === '5' && half === '') ||
    (hour === '5' && half === 'בערב') ||
    (hour === '5:00' && !half) ||
    (hour === '5:00' && half === '') ||
    (hour === '5:00' && half === 'בערב') ||
    (hour === 'חמש' && half === 'בערב') ||
    (hour === 'חמש' && half === '') ||
    (hour === 'חמש' && !half) ||
    (hour === '17:00' && half === '') ||
    (hour === '17:00' && !half)
  ) {
    return '17:00'
  } else if (
    hour === '17:30' ||
    hour === '5:30' ||
    (hour === 'חמש' && half === 'וחצי') ||
    (hour === '5' && half === 'וחצי') ||
    (hour === '5' && half === 'ושלושים') ||
    (hour === 'חמש' && half === 'ושלושים')
  ) {
    return '17:30'
  } else if (
    hour === '18:00' ||
    (hour === '18:00' && half === '') ||
    hour === '6:00' ||
    (hour === '6:00' && half === '') ||
    (hour === '6' && half === '') ||
    (hour === 'שש' && half === '')
  ) {
    return '18:00'
  } else if (
    hour === '18:30' ||
    hour === '6:30' ||
    (hour === 'שש' && half === 'וחצי') ||
    (hour === '6' && half === 'וחצי') ||
    (hour === '6' && half === 'ושלושים') ||
    (hour === 'שש' && half === 'ושלושים')
  ) {
    return '18:30'
  } else if (
    (hour === '19:00' && half === 'בערב') ||
    (hour === '7' && half === 'בערב') ||
    (hour === '7:00' && half === 'בערב') ||
    (hour === 'שבע' && half === 'בערב') ||
    (hour === '19:00' && half === 'בערב')
  ) {
    return '19:00'
  } else if (
    (hour === '19:30' && half === 'בערב') ||
    (hour === '7:30' && half === 'בערב')
  ) {
    return '19:30'
  } else if (
    (hour === '20:00' && half === 'בערב') ||
    (hour === '8' && half === 'בערב') ||
    (hour === '8:00' && half === 'בערב') ||
    (hour === 'שמונה ' && half === 'בערב') ||
    (hour === '20:00' && half === 'בערב')
  ) {
    return '20:00'
  }
}
export default HOURconfigrator

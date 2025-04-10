export function formatNumberWithCommas(number : number) {
    // تبدیل عدد به رشته و سپس جدا کردن سه رقم سه رقم
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
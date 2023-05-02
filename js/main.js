const calendar = document.getElementById("calendar");
const calendarHeader = document.getElementById("calendar-header");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const monthYear = document.getElementById("month-year");
const calendarBody = document.getElementById("calendar-dates");

// Crea una fecha y la muestra en el calendario
const createCalendar = (date) => {
  const today = new Date().getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const month = date.getMonth();
  const year = date.getFullYear();

  monthYear.innerHTML = `${monthNames[month]} ${year}`;

  // Obtiene el número de días en el mes actual
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Obtiene el primer día del mes
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Crea un arreglo con los días del mes
  let calendarDates = [];
  for (let i = 1; i <= numDaysInMonth; i++) {
    calendarDates.push(i);
  }

  // Crea filas y celdas para los días del mes
  let rows = [];
  let cells = [];

  calendarDates.forEach((date, i) => {
    if (i % 7 !== 0) {
      cells.push(`<td>${date}</td>`);
    } else {
      rows.push(`<tr>${cells.join("")}</tr>`);
      cells = [];
      cells.push(`<td>${date}</td>`);
    }
    if (i === calendarDates.length - 1) {
      rows.push(`<tr>${cells.join("")}</tr>`);
    }
  });

  // Agrega filas vacías al comienzo del calendario para rellenar el primer día del mes
  for (let i = 0; i < firstDayOfMonth; i++) {
    rows.unshift("<tr><td></td></tr>");
  }

  // Agrega filas vacías al final del calendario para rellenar hasta el último día de la semana
  while (rows.length % 7 !== 0) {
    rows.push("<tr><td></td></tr>");
  }

  // Agrega las filas al cuerpo del calendario
  calendarBody.innerHTML = rows.join("");

  if (today >= 1 && today <= numDaysInMonth) {
    const todayCell = document.querySelector(`td:nth-child(${today + firstDayOfMonth})`);
    if (todayCell) {
      todayCell.style.backgroundColor = "lightblue";
    }
  }
};

// Muestra el mes anterior
const prevMonth = () => {
  const currentDate = new Date(monthYear.innerHTML + " 1, " + new Date().getFullYear());
  const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  createCalendar(prevDate);
};

// Muestra el mes siguiente
const nextMonth = () => {
  const currentDate = new Date(monthYear.innerHTML + " 1, " + new Date().getFullYear());
  const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  createCalendar(nextDate);
};

try {
  prevMonthBtn.addEventListener("click", prevMonth);
  nextMonthBtn.addEventListener("click", nextMonth);
} catch (error) {
  console.error(error);
}

// Crea el calendario con la fecha actual
createCalendar(new Date());

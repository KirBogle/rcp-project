const EmployeeAPI = {
  employees: [
    { id: 1, name: "Ben Blocker", job: "Тренер" },
    { id: 2, name: "Dave Defender", job: "Админ" },
    { id: 3, name: "Sam Sweeper", job: "Посетитель" },
    { id: 4, name: "Matt Midfielder", job: "Тренер" },
    { id: 5, name: "William Winger", job: "Посетитель" },
    { id: 6, name: "Fillipe Forward", job: "Админ" },
  ],
  all: function () {
    return this.employees;
  },
  get: function (id) {
    const isEmployee = (p) => p.id === id;
    return this.employees.find(isEmployee);
  },
  delete: function (id) {
    const isNotDelEmployee = (p) => p.id !== id;
    this.employees = this.employees.filter(isNotDelEmployee);
    return true;
  },
  add: function (employee) {
    if (!employee.id)
      employee = {
        ...employee,
        id:
          this.employees.reduce((prev, current) => {
            return prev.id > current.id ? prev : current;
          }, 0).id + 1,
      };
    this.employees = [...this.employees, employee];
    return employee;
  },
  update: function (employee) {
    this.get();
    this.employees.shift(employee);
    return employee;
  },
};
export default EmployeeAPI;

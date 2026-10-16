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
    const nextId =
      this.employees.reduce((max, current) => Math.max(max, current.id), 0) + 1;
    const created = { name: employee.name, job: employee.job, id: nextId };
    this.employees = [...this.employees, created];
    return created;
  },
  update: function (employee) {
    this.employees = this.employees.map((item) =>
      item.id === employee.id ? { ...item, name: employee.name, job: employee.job } : item,
    );
    return this.get(employee.id);
  },
};
export default EmployeeAPI;

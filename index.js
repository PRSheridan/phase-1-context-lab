
function createEmployeeRecord (employeeArray) {
    const employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords (employeesArray) {
    const employeeList = employeesArray.map((employee) => {
        return createEmployeeRecord(employee)
    });
    return employeeList;
};

function createTimeInEvent (dt) {
    const tempDate = dt.slice(0, 10);
    const tempTime = Number(dt.slice(11, 15));
    this.timeInEvents.push({
        type: "TimeIn",
        hour: tempTime,
        date: tempDate
    });
    return this;
};

function createTimeOutEvent (dt) {
    const tempDate = dt.slice(0, 10);
    const tempTime = Number(dt.slice(11, 15));
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: tempTime,
        date: tempDate
    });
    return this;
};

function hoursWorkedOnDate (date) {
    let timeIn, timeOut;
    for (let event in this.timeInEvents){
        if ((this.timeInEvents[event].date === date)){
            timeIn = this.timeInEvents[event].hour};
    };
    for (let event in this.timeOutEvents){
        if ((this.timeOutEvents[event].date === date)){
            timeOut = this.timeOutEvents[event].hour};
    };
    return (timeOut - timeIn)/100;
};

function wagesEarnedOnDate (date) {
    let hours = hoursWorkedOnDate.call(this, date);
    let wage = this.payPerHour;
    return hours*wage;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll (employeesArray) {
    let totalWages = employeesArray.map((employee) => allWagesFor.call(employee));
    return totalWages.reduce((accum, currV) => {
        return accum + currV;
    });
};





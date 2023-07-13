const mongoose = require("mongoose")
const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
// const { Useschema } = require("../Models/User");
const { Employee } = require("../Models/Employee");
const { authenticateToken } = require("../Middleware/auth");
// Employee
// authenticateToken
const EmployeeRouter = express.Router()  

EmployeeRouter.post('/employees', authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, email, department, salary } = req.body;

        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            department,
            salary
        });

        await newEmployee.save();

        res.status(201).json({ message: 'Employee add successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error' });
    }
});


EmployeeRouter.get('/employees',  async (req, res) => {
    try {
        const { page = 1, limit = 5, department = '', sortBy = 'salary', sortOrder = 'asc', search = '' } = req.query;

        const filter = department ? { department } : {};

        if (search) {
            filter.firstName = { $regex: search, $options: 'i' };
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const [employees, totalEmployees] = await Promise.all([
            Employee.find(filter)
                .sort(sortOptions)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            Employee.countDocuments(filter)
        ]);

        res.status(200).json({ employees, totalEmployees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error' });
    }
});



EmployeeRouter.put('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, department, salary } = req.body;

        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.firstName = firstName;
        employee.lastName = lastName;
        employee.email = email;
        employee.department = department;
        employee.salary = salary;

        await employee.save();

        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

EmployeeRouter.delete('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByIdAndRemove(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});



module.exports = { EmployeeRouter };
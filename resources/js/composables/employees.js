import {ref,reactive} from 'vue';
import axios from 'axios';

export default function useEmployees(){

	const employee = ref([]);
	const employees = ref([]);
	const errors = ref([]);
	const employee_id = ref('');
	
	const form  = reactive({
		name:'',
		email:'',
		address: '',
		phone:''
	});

	const getEmployees = async () => {
		let response = await axios.get('/api/employees');
		employees.value = response.data;
	}
	const getEmployee = async (id) => {
		let response = await axios.get(`/api/employees/${id}`);
		employee.value = response.data;
	}

	const storeEmoloyee = async (form) => {
		errors.value = '';
		try{
			await axios.post(`/api/employees`,form);
			getEmployees()
			formReset();
			$("#myModal").modal('hide');
		}catch(e){
			if(e.response.status == 422){
				var data = [];
				for(const key in e.response.data.errors){
					data.push(e.response.data.errors[key][0]);
				}
				errors.value = data;
			}
		}
	}

	const editEmployee = async(employee) => {
		employee_id.value = employee.id;
		form.name = employee.name;
		form.email = employee.email;
		form.address= employee.address;
		form.phone = employee.phone;
	}

	const updateEmployee = async(form) => {
		errors.value = '';
		try{
			await axios.patch('api/employees/' + employee_id.value,form)
			getEmployees();
			formReset();
			employee_id.value = '';
			$("#myModal").modal('hide');
		}catch(e){
			if(e.response.status == 422){
				var data = [];
				for(const key in e.response.data.errors){
					data.push(e.response.data.errors[key][0]);
				}
				errors.value = data;
			}
		}
	}

	const deleteEmployee = async(id) =>{
		await axios.delete('api/employees/' + id)
		getEmployees();
	}

	const formReset = async()=>{
		form.name = '';
		form.email = '';
		form.address = '';
		form.phone = '';
	}

	return {
		form,
		errors,
		employee,
		employees,
		employee_id,
		getEmployee,
		getEmployees,
		storeEmoloyee,
		editEmployee,
		updateEmployee,
		deleteEmployee,
		formReset

	}

}

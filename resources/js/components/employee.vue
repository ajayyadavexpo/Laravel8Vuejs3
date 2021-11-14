<template>
	<div class="container p-5">

		<button type="button" class="btn btn-primary mb-4 float-right" data-toggle="modal" data-target="#myModal" @click="formReset">New Employee</button>

		<div class="modal" id="myModal">
			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-header">
						<h5 class="modal-title text-muted">Add New Employee</h5>
						<button type="button" class="close close_modal" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body">

						<div class="text-sm text-danger" if="errors != ''">
							<p v-for="error in errors" class="mb-0" :key="error"><small>{{ error }} </small></p>
						</div>



						<div class="form-group">
							<label>Name</label>
							<input type="text" class="form-control" v-model="form.name">
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="email" class="form-control" v-model="form.email">
						</div>
						<div class="form-group">
							<label>Phone</label>
							<input type="text" class="form-control" v-model="form.phone">
						</div>

						<button v-if="employee_id == ''" type="button" class="btn btn-primary" @click="storeEmployee">Submit</button>

						<button v-else type="button" class="btn btn-primary" @click="updateEmployee">Update</button>
						
					</div>
				</div>
			</div>
		</div>


		
		<table class="table table-bordered table-hover">
			<thead>
				<th>Name</th>
				<th>Email</th>
				<th>Phone</th>
				<th>Action</th>
			</thead>

			<tbody>
				<template v-for="employee in employees" :key="employee.id">
					<tr>
						<td>{{ employee.name }}</td>
						<td>{{ employee.email }}</td>
						<td>{{ employee.phone }}</td>
						<td>
							<button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#myModal" @click="editEmployee(employee)">Edit</button>
							<button type="button" class="btn btn-sm btn-danger ml-2" @click="deleteEmployee(employee.id)">Delete</button>
						</td>
					</tr>					
				</template>
			</tbody>
		</table>
	</div>
</template>
<script>
	import { ref,reactive, onMounted } from 'vue';
	import axios from 'axios';
	export default{
		setup(){
			const employees  = ref([]);
			const errors  = ref([]);
			const employee_id  = ref('');
			const form = reactive({
				name:'',
				email:'',
				phone:''
			});

			const getEmployee = async() =>{
				let res = await axios.get('api/employees');
				employees.value = res.data;
			}

			const deleteEmployee = async(id)=>{
				await axios.delete('api/employees/'+ id)
				getEmployee()
			}

			const storeEmployee = async() => {
				try{
					await axios.post('api/employees',form)
					getEmployee()
					formReset()
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
			
			const updateEmployee = async() => {
				try{
					await axios.patch('api/employees/' + employee_id.value,form)
					getEmployee()
					formReset()
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

			const editEmployee = (employee)=>{
				employee_id.value = employee.id;
				form.name = employee.name;
				form.email = employee.email;
				form.phone = employee.phone;
			}

			onMounted(getEmployee());

			const formReset = () =>{
				employee_id.value = '';
				form.name = '';
				form.email = '';
				form.phone = '';
			}

			return {
				employees,
				form,
				storeEmployee,
				errors,
				editEmployee,
				employee_id,
				updateEmployee,
				formReset,
				deleteEmployee
			}

		}
	}
</script>
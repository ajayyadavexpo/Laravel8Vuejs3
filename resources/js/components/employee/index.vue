<template>
	<div class="container">
		<button type="button" class="btn btn-primary mb-4 float-right" data-toggle="modal" data-target="#myModal" @click="resetEmployeeForm">New Employee</button>

		<!-- The Modal -->
		<div class="modal" id="myModal">
		  <div class="modal-dialog">
		    <div class="modal-content">

		      <!-- Modal Header -->
		      <div class="modal-header">
		        <h5 class="modal-title text-muted">Add New Employee</h5>
		        <button type="button" class="close close_modal" data-dismiss="modal">&times;</button>
		      </div>

		      <!-- Modal body -->
		      <div class="modal-body">
		      	<div class="text-sm text-danger" v-if="errors != ''">
		      		<p v-for="error in errors" class='mb-0'><small>{{ error}}</small></p>
		      	</div>
		        <form>

				  <div class="form-group">
				    <label for="name">Name:</label>
				    <input type="name" class="form-control" placeholder="Enter name" id="name" v-model="form.name">
				  </div>

				  <div class="form-group">
				    <label for="email">Email address:</label>
				    <input type="email" class="form-control" placeholder="Enter email" id="email" v-model="form.email">
				  </div>
				  
				  <div class="form-group">
				    <label for="address">Address</label>
				    <textarea class="form-control" rows="2" placeholder="Enter Address" id="address" v-model="form.address"></textarea>
				  </div>

				  <div class="form-group">
				    <label for="phone">Phone:</label>
				    <input type="text" class="form-control" placeholder="Enter phone" id="phone" v-model="form.phone">
				  </div>

				  <button v-if="employee_id != ''" type="button" class="btn btn-primary " @click="updateEmployeeData">Update</button>

				  <button v-else type="button" class="btn btn-primary" @click="saveEmployee">Submit</button>

				</form>
		      </div>
		    </div>
		  </div>
		</div>

		<table class="table table-hover table-bordered">
			<thead>
				<th>Name</th>
				<th>Email</th>
				<th>Address</th>
				<th>Phone</th>
				<th>Action</th>
			</thead>
			<tbody>
				<template v-for="employee in employees" :key="employee.id">
					<tr>
						<td>{{ employee.name }}</td>
						<td>{{ employee.email }}</td>
						<td>{{ employee.address }}</td>
						<td>{{ employee.phone }}</td>
						<td>
							<button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#myModal" @click="editEmployeeData(employee)">Edit</button>
							
							<button type="button" class="btn btn-sm btn-danger ml-2"  @click="deleteEmployeeData(employee.id)">Delete</button>
							
						</td>
					</tr>
				</template>
			</tbody>
		</table>

	</div>
</template>
<script>
	import useEmployees from '../../composables/employees';
	import { onMounted } from 'vue';
	export default{
		setup(){
			const { 
				errors,
			 	form,
			 	employee_id,
				employees,
			 	getEmployees,
			 	storeEmoloyee,
			 	editEmployee,
			 	updateEmployee,
			 	deleteEmployee,
			 	formReset
			 } = useEmployees()

			const saveEmployee = () => {
				storeEmoloyee(form)
			}

			const editEmployeeData = (employee) =>{
				editEmployee(employee)
			}

			const updateEmployeeData = () =>{
				updateEmployee(form)
			}

			const deleteEmployeeData = (id) =>{
				deleteEmployee(id)
			}

			const resetEmployeeForm = () =>{
				formReset();
			}
	
			onMounted(getEmployees);
			
			return {
				form,
				employee_id,
				errors,
				employees,
				saveEmployee,
				editEmployeeData,
				updateEmployeeData,
				deleteEmployeeData,
				resetEmployeeForm
			}
		}
	}
</script>
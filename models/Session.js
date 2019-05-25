const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

class Session extends Sequelize.Model {}

Session.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    totalPages: Sequelize.INTEGER,
    totalCellCount: Sequelize.INTEGER,
    outputFilePath: Sequelize.STRING,
    inputFilePath: Sequelize.STRING,
    status:Sequelize.ENUM('STARTED','EXCELCOMPLETED','COMPLETED')
  },
  { sequelize, modelName: 'session' }
);
module.exports = Session;

// 7. client's_user's_session's_table :
// ------------------------------------------
// 	{
// 		#client_id : --
// 		#user_id :
// 		#session_id :

// 		session_date :
// 		no_of_pages :
// 		cell_count :
// 		final_output_type :
// 		final_output_file_id :
// 		final_input_file_id :
// 		#autofill_mapper_info_id :
// 		status :
// 	}

// users_session_info_table :
// ---------------------------------------------
// 	{
// 		*unique_session_info_key :
// 		*page_number :
// 		page_raw_json :
// 		page_updated_json :
// 		page_cell_count :
		
// 		page_error_in_cell_estimation : JSON
// page_error_in_cell_estimation_count : for accuracy
// 		page_mode_of_operation :
	
		
// 		#page_autofill_mapper_info_id :
// 		#page_error_log_id :
// 	}


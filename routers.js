const HOME = "/";
const JOIN = "/join";

//calendar page
const CALENDAR = "/calendar";
const CALENDAR_DETAIL = "/{date}";
const MEDICATION = "/medication";

//medicine list page
const MEDICINES = "/medicines";
//alarm addition page
const ADDITIONFORM = "/addForm";
const INSERT = "/insert";
const EDIT_MEDICINE = "/{medicine-id}/edit";
const DELETION = "/{medicine-id}/deletion";

//user profile page
const USER = "/:id";
const EDIT_PROFILE = "/edit-profile";

const routes = 
{
home: HOME,
join: JOIN,
calendar: CALENDAR,
calendarDetail: CALENDAR_DETAIL,
medication: MEDICATION,
medicines: MEDICINES,
addForm: ADDITIONFORM,
insert: INSERT,
editMedicine: EDIT_MEDICINE,
deletion: DELETION,
user: USER,
editProfile: EDIT_PROFILE
};

module.exports = routes;
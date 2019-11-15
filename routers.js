const HOME = "/";
const JOIN = "/join";

//calendar page
const CALENDAR = "/calendar";
const CALENDAR_DETAIL = "/{date}";
const MEDICATION = "/medication";

//medicine list page
const MEDICINES = "/medicines";
const ADDITION = "/addition";
const MEDICINE_DETAIL = "/{medicine-id}";
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
medication: MEDICATION,
medicines: MEDICINES,
addition: ADDITION,
medicineDetail: MEDICINE_DETAIL,
editMedicine: EDIT_MEDICINE,
deletion: DELETION,
user: USER,
editProfile: EDIT_PROFILE
};

module.exports = routes;
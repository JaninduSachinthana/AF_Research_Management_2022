import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Main from './src/pages/Main';
import AdminMain from './src/pages/admin/adminMain';
import StudentMain from './src/pages/student/studentHome';
import PanelMain from './src/pages/staff/panel members/main';
import SupervisorMain from './src/pages/staff/Supervisors/main';
import ResearchSubmit from './src/pages/student/researchSubmit';
import StudentReg from './src/pages/admin/studentReg';
import AddAssignment from './src/pages/admin/addAssignment';
import AddSchema from './src/pages/admin/addShema';
import AllForUser from './src/pages/group/allGroup';
import GroupReg from './src/pages/group/GroupRegister';
import GroupView from './src/pages/group/Group_View';
import TopicRegister from './src/pages/student/topicReg';
import StaffRegister from './src/pages/admin/staffReg';
import AdminRegister from './src/pages/admin/adminReg';
import ViewAssignment from './src/pages/admin/viewAssignment';
import EmailVerify from './src/pages/Emailverify/EmailVerify';
import Login from './src/pages/Login';
import StudentViewAssignment from './src/pages/student/assignmentView';
import ChatMain from './src/pages/chat/chat';
import GroupEdit from './src/pages/group/Group_Edit';
import TopicRegister from './src/pages/student/topicReg';
import TopicRegister from './src/pages/topic/Topic_register';
import TopicViewStd from './src/pages/topic/Topic_view_std';
import TopicView from './src/pages/topic/Topic_View';
import ViewAssignmentSubmission from './src/pages/staff/Supervisors/submissionView';
import AddNotices from "./src/pages/Notice/AddNotice";
import ViewNotices from "./src/pages/Notice/viewNotice";
import UdateNotices from "./src/pages/Notice/Update_Notices";
import AdminSchemaView from './src/pages/admin/viewSchema';
import StaffSchemaViews from './src/pages/staff/Supervisors/viewSchema';
import StudentSchemaView from './src/pages/student/viewSchema';
import ViewUsers from './src/pages/admin/viewUsers';
import ViewSupervisors from './src/pages/admin/viewSupervisors';
import ViewAdmin from './src/pages/admin/viewAdmin';
import ViewPanelMembers from './src/pages/admin/viewPanelMem';
import PanelReg from './src/pages/panels/panelAdd';
import ViewPanels from './src/pages/panels/viewPanels';
import ViewPanelsStudent from './src/pages/panels/viewPanelsStudent';
import ViewPanelsMem from './src/pages/panels/viewPanelsMembers';
import TopicViewPanel from './src/pages/topic/viewTopicsPanels';
import ViewAssignmentSubmissionPanel from './src/pages/staff/panel members/researchSubEve';
import StaffSchemaViewPan from './src/pages/staff/panel members/schemaView';
import TopicViewStd from './src/pages/topic/viewTopicStudents';
import ContactUS from './src/pages/student/Contactus';
import GroupStudentView from './src/pages/group/groupStudentView';
import ContactUSSupervisor from './src/pages/staff/Supervisors/ContactUsSupervisor';
import ContactUSPanel from './src/pages/staff/panel members/contactUsPanel';
import ViewPanelsSup from './src/pages/panels/viewPanelsSup';
import TopicViewAdmin from './src/pages/topic/viewTopicAdmin';

export default class App extends React.Component {

 constructor(props) {
    super(props);
 }

 render() {
    return(
        <BrowserRouter>
        {/* <h1>Hello to React APP</h1> */}

         <Routes>

            <Route path="/" element={<Main />} />

            <Route path="/Admin" element={<AdminMain />} />
            <Route path="/Admin/AddAssignment" element={<AddAssignment />} /> 
            <Route path="/Admin/ViewAssignment" element={<ViewAssignment />} />           
            <Route path="/Admin/AddSchema" element={<AddSchema />} />
            <Route path="/Admin/viewSchema" element={<AdminSchemaView />} />
            <Route path="/Admin/GroupView" element={<GroupView />} />
            <Route path="/Admin/Topic_View" element={<TopicView/>} />
            <Route path='/Admin/AddNotices' element={<AddNotices/>}/>
            <Route path='/Admin/viewNotice'element={<ViewNotices/>}/>
            <Route path="/Admin/ViewUsers" element={<ViewUsers />} />
            <Route path="/Admin/ViewSupervisors" element={<ViewSupervisors />} />
            <Route path="/Admin/ViewAdmin" element={<ViewAdmin />} />
            <Route path="/Admin/ViewPanelMembers" element={<ViewPanelMembers />} />
            <Route path="/Admin/PanelReg" element={<PanelReg />} />
            <Route path="/Admin/ViewPanels" element={<ViewPanels />} />
            <Route path="/Admin/TopicView" element={<TopicViewAdmin />} />
                        
            <Route path="/StudentReg" element={<StudentReg />} />
            <Route path="/StaffRegister" element={<StaffRegister />} />
            <Route path="/AdminRegister" element={<AdminRegister />} />
            <Route path="/users/:id/verify/:token/" element={<EmailVerify />} />
            <Route path="/login" element={<Login />} />

            <Route path="/Student" element={<StudentMain />} />
            <Route path="/Student/ResearchSub" element={<ResearchSubmit />} />
            <Route path="/Student/TopicRegister" element={<TopicRegister />} />
            <Route path="/Student/AllGroup" element={<AllForUser />} />
            <Route path="/Student/GroupAdd" element={<GroupReg />} />
            <Route path="/Student/ViewAssignment" element={<StudentViewAssignment />} />
            <Route path="/Student/GroupView" element={<GroupView />} />
            <Route path="/Student/Group_Edit/:id" element={<GroupEdit />} />
            <Route path="/Student/Topic_register" element={<TopicRegister/>} />
            <Route path="/Student/Topic_view_std" element={<TopicViewStd/>} />
            <Route path="/Student/ResultView" element={<StudentSchemaView/>} />            
            <Route path="/Student/ViewPanelsStudent" element={<ViewPanelsStudent/>} />          
            <Route path="/Student/Contact" element={<ContactUS/>} />
            <Route path="/Student/GroupStudentView" element={<GroupStudentView/>} />
   
           

            <Route path="/Panel" element={<PanelMain />} />
         
            <Route path="/Panel/ViewPanelsMem" element={<ViewPanelsMem />} />
            <Route path="/Panel/TopicViewPanel" element={<TopicViewPanel />} />
            <Route path="/Panel/researchView" element={< ViewAssignmentSubmissionPanel/>} />
            <Route path="/Panel/viewSchema" element={< StaffSchemaViewPan/>} />
            <Route path="/Panel/ContactUs" element={<ContactUSPanel/>} />
 
            <Route path="/Supervisor" element={<SupervisorMain />} />
            <Route path="/Supervisor/researchView" element={<ViewAssignmentSubmission />} />
            <Route path="/Supervisor/viewSchema" element={<StaffSchemaViews />} />
            <Route path="/Supervisor/Topic_View" element={<TopicView/>} />
            <Route path="/Supervisor/contactUs" element={<ContactUSSupervisor/>} />
            <Route path="/Supervisor/ViewPanels" element={<ViewPanelsSup/>} />
            
            <Route path='/UpdateNotice/:id'element={<UdateNotices/>}/>
            
            <Route path="/Chat" element={<ChatMain />} />
          

            {/* <Route path="/cal"element={<Cal/>}/> */}
         </Routes>
                     

        {/* <Header/> */}

        </BrowserRouter>
      );
   }
}

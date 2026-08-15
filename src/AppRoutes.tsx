import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AppShell from "./components/shell/AppShell";
import Home from "./pages/home/Home";

// Meetings
const Meetings = lazy(() => import("./pages/meetings/Meetings"));
const MeetingProgress = lazy(
  () => import("./pages/meetings/MeetingProgress")
);
const MidweekMeeting = lazy(
  () => import("./pages/meetings/MidweekMeeting")
);
const WeekendMeeting = lazy(
  () => import("./pages/meetings/WeekendMeeting")
);
const MeetingNotes = lazy(
  () => import("./pages/meetings/MeetingNotes")
);
const MeetingPreparation = lazy(
  () =>
    import(
      "./features/meeting-preparation/pages/MeetingPreparation"
    )
);

// Workbook & Assignments
const Workbook = lazy(() => import("./pages/workbook/Workbook"));
const Assignments = lazy(
  () => import("./pages/assignments/Assignments")
);

const AssignmentPreparation = lazy(
  () =>
    import(
      "./features/assignments/pages/AssignmentPreparation"
    )
);

// Service
const Service = lazy(() => import("./pages/service/Service"));

// Personal
const Personal = lazy(() => import("./pages/personal/Personal"));
const BibleReading = lazy(
  () => import("./pages/personal/BibleReading")
);
const PrayerJournal = lazy(
  () => import("./pages/personal/PrayerJournal")
);

const PersonalStudyPage = lazy(
  () => import("./features/personal-study/pages/PersonalStudyPage")
);

const StudyNotebookPage = lazy(
  () => import("./features/personal-study/pages/StudyNotebookPage")
);

const NotebookPage = lazy(
  () => import("./features/notebooks/pages/NotebookPage")
);

const NotebookWorkspace = lazy(
  () => import("./features/notebooks/pages/NotebookWorkspace")
);

const LifeSchedulePage = lazy(() =>
  import("./features/life-schedule").then((module) => ({
    default: module.LifeSchedulePage,
  }))
);

const FamilyWorshipPage = lazy(() =>
  import("./features/family-worship").then((module) => ({
    default: module.FamilyWorshipPage,
  }))
);

// Ministry
const MinistryDashboard = lazy(
  () => import("./features/ministry/pages/MinistryDashboard")
);

const MinistrySession = lazy(
  () => import("./features/ministry/pages/MinistrySession")
);

const MinistryReports = lazy(
  () => import("./features/ministry/pages/MinistryReports")
);

const ReturnVisits = lazy(
  () => import("./features/ministry/pages/ReturnVisits")
);

const BibleStudies = lazy(
  () => import("./features/ministry/pages/BibleStudies")
);

// Congregation
const Dashboard = lazy(
  () => import("./features/congregation/dashboard/pages/Dashboard")
);

const PublisherList = lazy(
  () => import("./features/congregation/pages/PublisherList")
);

const PublisherEditor = lazy(
  () => import("./features/congregation/pages/PublisherEditor")
);

const Reports = lazy(
  () => import("./features/congregation/pages/Reports")
);

// Elders Meetings
const BodyOfEldersMeetingPage = lazy(
  () =>
    import(
      "./features/congregation/elders-meetings/pages/BodyOfEldersMeetingPage"
    )
);

const ServiceCommitteeMeetingPage = lazy(
  () =>
    import(
      "./features/congregation/elders-meetings/pages/ServiceCommitteeMeetingPage"
    )
);

const OtherMeetingsPage = lazy(
  () =>
    import(
      "./features/congregation/elders-meetings/pages/OtherMeetingsPage"
    )
);

const MeetingLibraryPage = lazy(
  () =>
    import(
      "./features/congregation/elders-meetings/pages/MeetingLibraryPage"
    )
);

// Service Groups
const ServiceGroupList = lazy(
  () =>
    import(
      "./features/congregation/service-groups/pages/ServiceGroupList"
    )
);

const ServiceGroupProfile = lazy(
  () =>
    import(
      "./features/congregation/service-groups/pages/ServiceGroupProfile"
    )
);

const ServiceGroupEditor = lazy(
  () =>
    import(
      "./features/congregation/service-groups/pages/ServiceGroupEditor"
    )
);

// Territories
const TerritoryList = lazy(
  () =>
    import(
      "./features/congregation/territories/pages/TerritoryList"
    )
);

const TerritoryProfile = lazy(
  () =>
    import(
      "./features/congregation/territories/pages/TerritoryProfile"
    )
);

const TerritoryEditor = lazy(
  () =>
    import(
      "./features/congregation/territories/pages/TerritoryEditor"
    )
);

// Body of Elders
const BodyMemberList = lazy(
  () =>
    import(
      "./features/congregation/body-of-elders/pages/BodyMemberList"
    )
);

const BodyMemberProfile = lazy(
  () =>
    import(
      "./features/congregation/body-of-elders/pages/BodyMemberProfile"
    )
);

const BodyMemberEditor = lazy(
  () =>
    import(
      "./features/congregation/body-of-elders/pages/BodyMemberEditor"
    )
);

// Tools & Settings
const Tools = lazy(() => import("./pages/tools/Tools"));
const Settings = lazy(() => import("./pages/settings/Settings"));

// Service Committee
const ServiceCommitteeList = lazy(
  () =>
    import(
      "./features/congregation/service-committee/pages/ServiceCommitteeList"
    )
);

const ServiceCommitteeProfile = lazy(
  () =>
    import(
      "./features/congregation/service-committee/pages/ServiceCommitteeProfile"
    )
);

const ServiceCommitteeEditor = lazy(
  () =>
    import(
      "./features/congregation/service-committee/pages/ServiceCommitteeEditor"
    )
);

// Departments
const DepartmentsPage = lazy(
  () =>
    import(
      "./features/congregation/departments/pages/DepartmentsPage"
    )
);

const DepartmentDetailsPage = lazy(
  () =>
    import(
      "./features/congregation/departments/pages/DepartmentDetailsPage"
    )
);

// Meeting Schedule
const MidweekMeetingPage = lazy(
  () =>
    import(
      "./features/meeting-schedule/midweek/MidweekMeetingPage"
    )
);

const WeekendMeetingPage = lazy(
  () =>
    import(
      "./features/meeting-schedule/weekend/WeekendMeetingPage"
    )
);

const FieldServicePage = lazy(
  () =>
    import(
      "./features/meeting-schedule/field-service/FieldServicePage"
    )
);

const CartWitnessingPage = lazy(
  () => import("./features/congregation/cart-witnessing/CartWitnessingPage")
);

function PageLoading() {
  return (
    <div
      style={{
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      Loading…
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route element={<AppShell />}>
          {/* Personal notebooks */}
          <Route
            path="/personal/notebooks"
            element={<NotebookPage />}
          />

          <Route
            path="/personal/notebooks/:id"
            element={<NotebookWorkspace />}
          />

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Meetings */}
          <Route
            path="/meetings"
            element={<Meetings />}
          />

          <Route
            path="/meetings/progress"
            element={<MeetingProgress />}
          />

          <Route
            path="/meetings/midweek"
            element={<MidweekMeeting />}
          />

          <Route
            path="/meetings/weekend"
            element={<WeekendMeeting />}
          />

          <Route
            path="/meetings/notes"
            element={<MeetingNotes />}
          />

          <Route
  path="/meeting-preparation"
  element={<MeetingPreparation />}
/>

          {/* Workbook */}
          <Route
            path="/workbook"
            element={<Workbook />}
          />

          {/* Assignments */}
          <Route
            path="/assignments"
            element={<Assignments />}
          />
<Route
  path="/assignments/prepare"
  element={<AssignmentPreparation />}
/>

          {/* Service */}
          <Route
            path="/service"
            element={<Service />}
          />

          {/* Personal */}
          <Route
            path="/personal"
            element={<Personal />}
          />

          <Route
            path="/personal/bible-reading"
            element={<BibleReading />}
          />

          <Route
            path="/personal/personal-study"
            element={<PersonalStudyPage />}
          />

          <Route
            path="/personal/personal-study/:id"
            element={<StudyNotebookPage />}
          />

          <Route
            path="/personal/prayer"
            element={<PrayerJournal />}
          />

          <Route
            path="/personal/family-worship"
            element={<FamilyWorshipPage />}
          />

          <Route
            path="/personal/life-schedule"
            element={<LifeSchedulePage />}
          />

          {/* Ministry */}
          <Route
            path="/ministry"
            element={<MinistryDashboard />}
          />

          <Route
            path="/ministry/reports"
            element={<MinistryReports />}
          />

          <Route
            path="/ministry/session/new"
            element={<MinistrySession />}
          />

          <Route
            path="/ministry/session/:id"
            element={<MinistrySession />}
          />

          <Route
            path="/ministry/return-visits"
            element={<ReturnVisits />}
          />

          <Route
            path="/ministry/bible-studies"
            element={<BibleStudies />}
          />

          {/* Elders Meetings */}
          <Route
            path="/congregation/elders-meetings"
            element={<MeetingLibraryPage />}
          />

          <Route
            path="/congregation/elders-meetings/body-of-elders"
            element={<BodyOfEldersMeetingPage />}
          />

          <Route
            path="/congregation/elders-meetings/service-committee"
            element={<ServiceCommitteeMeetingPage />}
          />

          <Route
            path="/congregation/elders-meetings/other"
            element={<OtherMeetingsPage />}
          />

          {/* Congregation */}
          <Route
            path="/congregation"
            element={<Dashboard />}
          />

          {/* Meeting Schedule */}
          <Route
            path="/congregation/midweek"
            element={<MidweekMeetingPage />}
          />

          <Route
            path="/congregation/weekend"
            element={<WeekendMeetingPage />}
          />

          <Route
            path="/congregation/field-service"
            element={<FieldServicePage />}
          />

          <Route
            path="/congregation/cart-witnessing"
            element={<CartWitnessingPage />}
          />

          {/* Publishers */}
          <Route
            path="/congregation/publishers"
            element={<PublisherList />}
          />

          <Route
            path="/congregation/publishers/new"
            element={<PublisherEditor />}
          />

          <Route
            path="/congregation/publishers/:id"
            element={<PublisherEditor />}
          />

          {/* Service Groups */}
          <Route
            path="/congregation/service-groups"
            element={<ServiceGroupList />}
          />

          <Route
            path="/congregation/service-groups/new"
            element={<ServiceGroupEditor />}
          />

          <Route
            path="/congregation/service-groups/:id"
            element={<ServiceGroupProfile />}
          />

          <Route
            path="/congregation/service-groups/:id/edit"
            element={<ServiceGroupEditor />}
          />

          {/* Territories */}
          <Route
            path="/congregation/territories"
            element={<TerritoryList />}
          />

          <Route
            path="/congregation/territories/new"
            element={<TerritoryEditor />}
          />

          <Route
            path="/congregation/territories/:id"
            element={<TerritoryProfile />}
          />

          <Route
            path="/congregation/territories/:id/edit"
            element={<TerritoryEditor />}
          />

          {/* Body of Elders */}
          <Route
            path="/congregation/body-of-elders"
            element={<BodyMemberList />}
          />

          <Route
            path="/congregation/body-of-elders/new"
            element={<BodyMemberEditor />}
          />

          <Route
            path="/congregation/body-of-elders/:id"
            element={<BodyMemberProfile />}
          />

          <Route
            path="/congregation/body-of-elders/:id/edit"
            element={<BodyMemberEditor />}
          />

          {/* Service Committee */}
          <Route
            path="/congregation/service-committee"
            element={<ServiceCommitteeList />}
          />

          <Route
            path="/congregation/service-committee/new"
            element={<ServiceCommitteeEditor />}
          />

          <Route
            path="/congregation/service-committee/:id"
            element={<ServiceCommitteeProfile />}
          />

          <Route
            path="/congregation/service-committee/:id/edit"
            element={<ServiceCommitteeEditor />}
          />

          {/* Departments */}
          <Route
            path="/congregation/departments"
            element={<DepartmentsPage />}
          />

          <Route
            path="/congregation/departments/:id"
            element={<DepartmentDetailsPage />}
          />

          {/* Reports */}
          <Route
            path="/congregation/reports"
            element={<Reports />}
          />

          {/* Tools */}
          <Route
            path="/tools"
            element={<Tools />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
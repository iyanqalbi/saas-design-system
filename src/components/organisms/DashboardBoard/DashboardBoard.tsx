import {
  Bug,
  FileText,
  FlaskConical,
  Folder,
  Mail,
  Moon,
  Plus,
  Rocket,
  Search,
  Workflow,
} from 'lucide-react'
import { Button } from '../../atoms/Button'
import { ButtonGroup } from '../../molecules/ButtonGroup'
import { DocumentCard } from '../../molecules/DocumentCard'
import { SearchField } from '../../molecules/SearchField'
import { SectionHeader } from '../../molecules/SectionHeader'
import { TemplateCard } from '../../molecules/TemplateCard'
import { Carousel } from '../../molecules/Carousel'
import { TreeView } from '../../molecules/TreeView'
import { UpgradeCard } from '../../molecules/UpgradeCard'
import { UsageMeter } from '../../molecules/UsageMeter'
import { UserChip } from '../../molecules/UserChip'
import { WorkspaceSwitcher } from '../../molecules/WorkspaceSwitcher'
import { Select } from '../../molecules/Select'
import { PageHeader } from '../PageHeader'
import { StatsRow } from '../StatsRow'
import { LineChart } from '../LineChart'
import { DataTable } from '../DataTable'
import type { DataTableTaskRow } from '../DataTable'
import { Sidebar } from '../Sidebar'
import './DashboardBoard.css'

const taskRows: DataTableTaskRow[] = [
  {
    id: '1',
    name: 'Refactor login flow',
    people: [{ name: 'Maya Chen' }, { name: 'Jordan Lee' }, { name: 'Priya Shah' }],
    type: 'Feature',
    typeIcon: <Rocket size={14} />,
    typeTone: 'accent',
    timeline: 'Jun 24 – Jul 3, 2025',
    priority: 'High',
    priorityTone: 'danger',
    progress: 72,
  },
  {
    id: '2',
    name: 'Fix avatar stacking overlap',
    people: [{ name: 'Noah Kim' }, { name: 'Alex Rivera' }],
    type: 'Bug',
    typeIcon: <Bug size={14} />,
    typeTone: 'danger',
    timeline: 'Jun 28 – Jul 1, 2025',
    priority: 'Medium',
    priorityTone: 'warning',
    progress: 45,
  },
  {
    id: '3',
    name: 'QA payment retries',
    people: [{ name: 'Sam Ortiz' }],
    type: 'Testing',
    typeIcon: <FlaskConical size={14} />,
    typeTone: 'success',
    timeline: 'Jul 1 – Jul 5, 2025',
    priority: 'Low',
    priorityTone: 'accent',
    progress: 18,
  },
]

export interface DashboardBoardProps {
  className?: string
}

export function DashboardBoard({ className = '' }: DashboardBoardProps) {
  return (
    <div className={`dashboard-board ${className}`.trim()}>
      <Sidebar
        className="dashboard-board__sidebar"
        defaultActiveId="dashboard"
        defaultOpenIds={[]}
        brand={
          <WorkspaceSwitcher
            name="Lunor"
            subtitle="Workspace"
            mark={<Moon size={16} />}
            onClick={() => undefined}
          />
        }
        header={<SearchField placeholder="Search…" shortcut="/" size="sm" />}
        afterNav={
          <TreeView
            createLabel="Create folder"
            onCreate={() => undefined}
            defaultOpenIds={['company']}
            items={[
              {
                id: 'company',
                label: 'Company contracts',
                icon: <Folder size={14} />,
                children: [
                  { id: 'nda', label: 'NDA Agreement', icon: <FileText size={14} /> },
                  { id: 'msa', label: 'Master Service', icon: <FileText size={14} /> },
                ],
              },
            ]}
          />
        }
        footer={
          <>
            <UpgradeCard
              title="Upgrade to Premium!"
              description="Unlimited seats and advanced analytics."
              onAction={() => undefined}
              onDismiss={() => undefined}
            />
            <UsageMeter value={891} max={1000} onAction={() => undefined} />
            <UserChip name="Jane Doe" role="Admin" onClick={() => undefined} />
          </>
        }
      />

      <div className="dashboard-board__main">
        <PageHeader
          title="Welcome back, Jane!"
          description="Track contracts, workflows, and sprint progress in one place."
          crumbs={[{ label: 'Dashboard' }]}
          actions={
            <ButtonGroup size="sm">
              <Button size="sm" variant="outlined">
                Export
              </Button>
              <Button size="sm" leftIcon={<Plus size={14} />}>
                Create
              </Button>
            </ButtonGroup>
          }
        />

        <StatsRow />

        <div className="dashboard-board__mid">
          <LineChart
            title="Signed over time"
            rangeControl={
              <Select
                label="Range"
                defaultValue="jan-jun"
                options={[
                  { value: 'jan-jun', label: 'Jan - Jun' },
                  { value: 'jul-dec', label: 'Jul - Dec' },
                ]}
              />
            }
            series={[
              { id: 'signed', label: 'Signed', tone: 'primary' },
              { id: 'sent', label: 'Sent', tone: 'muted', dashed: true },
            ]}
            points={[
              { label: 'Jan', values: [40, 28] },
              { label: 'Feb', values: [55, 36] },
              { label: 'Mar', values: [48, 42] },
              { label: 'Apr', values: [72, 50] },
              { label: 'May', values: [68, 58] },
              { label: 'Jun', values: [90, 64] },
            ]}
          />

          <div className="dashboard-board__docs">
            <SectionHeader
              title="Your Contacts"
              actions={<SearchField placeholder="Search…" size="sm" style={{ width: 160 }} />}
            />
            <div className="dashboard-board__doc-grid">
              <DocumentCard
                icon={<FileText />}
                title="NDA Agreement"
                description="Mutual NDA for vendor onboarding."
                people={[{ name: 'Maya Chen' }, { name: 'Jordan Lee' }]}
                peopleLabel="50+"
                onShare={() => undefined}
                onEdit={() => undefined}
              />
              <DocumentCard
                icon={<Folder />}
                title="Onboarding pack"
                description="Templates for new workspace setup."
                people={[{ name: 'Priya Shah' }, { name: 'Noah Kim' }, { name: 'Alex Rivera' }]}
                peopleLabel="240+"
                onShare={() => undefined}
                onEdit={() => undefined}
              />
            </div>
          </div>
        </div>

        <DataTable
          variant="tasks"
          title="All tasks"
          subtitle="Teams · current sprint"
          headerAction={
            <Button size="sm" variant="ghost" leftIcon={<Search size={14} />}>
              Filter
            </Button>
          }
          rows={taskRows}
        />

        <Carousel title="Recent templates">
          <TemplateCard
            icon={<Workflow />}
            title="Email Support Router"
            meta="Used 2 hours ago · Webhook"
            status="Active"
            integrations={[<Mail key="m" size={14} />]}
            runsLabel="1,204 runs"
          />
          <TemplateCard
            icon={<Workflow />}
            title="Contract Reminder"
            meta="Used yesterday · Schedule"
            status="Paused"
            statusTone="neutral"
            integrations={[<FileText key="f" size={14} />]}
            runsLabel="482 runs"
          />
          <TemplateCard
            icon={<Workflow />}
            title="Invoice Sync"
            meta="Used 3 days ago · Webhook"
            status="Active"
            integrations={[<Mail key="m2" size={14} />, <FileText key="f2" size={14} />]}
            runsLabel="96 runs"
          />
        </Carousel>
      </div>
    </div>
  )
}

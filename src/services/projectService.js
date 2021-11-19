import createInstance from './http'
import { createProject } from './adviserService'

export const projectService = createInstance({ url: '/projects' })

export { createProject }

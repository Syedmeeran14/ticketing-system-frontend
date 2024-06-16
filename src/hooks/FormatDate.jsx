import { format } from 'date-fns'

function formatDate(date)  {
    return format(new Date(date), "dd MMMM yyyy hh:mm a")
}

export default formatDate
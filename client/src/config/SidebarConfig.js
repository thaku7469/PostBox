import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



export const SIDEBAR_DATA = [
    {
        name : 'inbox',
        title : 'Inbox',
        Icon : PhotoOutlinedIcon
    }, 
    {
        name : 'starred',
        title : 'Starred',
        Icon : StarBorderOutlinedIcon
    },
    {
        name : 'sent',
        title : 'Sent',
        Icon : SendOutlinedIcon
    },
    {
        name : 'drafts',
        title : 'Drafts',
        Icon : InsertDriveFileOutlinedIcon
    },
    {
        name : 'bin',
        title : 'Bin',
        Icon : DeleteOutlineOutlinedIcon
    },
    {
        name : 'allmail',
        title : 'All Mails',
        Icon : MailOutlinedIcon
    }
]
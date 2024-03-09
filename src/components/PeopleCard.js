import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function PersonCard({ person, onDelete }) {
    return (
      <div className='card-info' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='family-request'>
          <img src={person.avatar} alt='placeholder' style={{width:'200px'}}/>
          <div className='family-info'>
            <p>{person.name}</p>
            <p>{person.edad || person.surname}</p>
          </div>
        </div>
        <div className='edit-delete-icons'>
          <EditIcon className='edit-fill' style={{ marginRight: '1rem' }} />
          <DeleteIcon className='trash' onClick={onDelete} />
        </div>
      </div>
    );
  }
  export default PersonCard;
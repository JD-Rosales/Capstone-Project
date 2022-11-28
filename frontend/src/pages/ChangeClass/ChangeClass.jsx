import './ChangeClass.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Grid2 from '@mui/material/Unstable_Grid2'
import change_class from '../../assets/changeClasscode_illustration.png'
const ChangeClass = () => {
  return (
    <div className="change-class">
      <Sidebar />

      <main>
        <header>
          <Grid2 container spacing={0}>
            <Grid2
              xs={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>
                CHANGE <span>CLASS</span>
              </h1>
              <p>
                Are you enrolled in the correct class? If not, feel free to
                switch classes.
              </p>
            </Grid2>
            <Grid2
              xs={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={change_class} alt="Change class Logo" />
            </Grid2>
          </Grid2>
        </header>
        
      </main>
    </div>
  )
}

export default ChangeClass

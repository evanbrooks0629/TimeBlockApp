import React from 'react';
import { Grid, Box, Tabs, Tab, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import ViewDay from '@mui/icons-material/ViewDay';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect, getFirebase} from "react-redux-firebase";
import NavBar from './NavBar';
import { TabPanel, tabProps } from './TabPanel';
import MonthCalendar from './MonthCalendar';
import WeekCalendar from './WeekCalendar';
import DayCalendar from './DayCalendar';
import getMonthArray from '../data_functions/getMonthArray';
import flags from "../data_functions/globals";
import {getFirestore} from "redux-firestore";

const Dashboard = (props) => {

    const today = new Date().getDate();
    const currMonth = new Date().getMonth()+1;
    const thisYear = new Date().getFullYear();

    const { monthArray, startWeekIndex, endWeekIndex } = getMonthArray(today, currMonth, thisYear);

    const user = {
        email: useSelector((state) => state.firebase.auth.email)
    }
    const profile = {
        ...user,
        ...useSelector((state) => state.firebase.profile)
    }

    let dayInd = 0;
    for (let i = 0; i < 42; i++) {
        if (monthArray[i].isToday) {
            dayInd = i;
            break;
        }
    }

    const [tabValue, setTabValue] = React.useState(0);

    const [monthIndex, setMonthIndex] = React.useState(currMonth); 
    const [arrayOfDays, setArrayOfDays] = React.useState(monthArray);
    const [currYear, setCurrYear] = React.useState(thisYear);
    const [weekStartIndex, setWeekStartIndex] = React.useState(startWeekIndex);
    const [weekEndIndex, setWeekEndIndex] = React.useState(endWeekIndex);
    const [dayIndex, setDayIndex] = React.useState(dayInd+1);

    const [blockFlag, setBlockFlag] = React.useState(0);


    const handleTabChange = (e, newTabValue) => {
        setTabValue(newTabValue);
    }

    const handleClickWeek = (start, end) => {
        console.log("From Dash: " + start + ", " + end);
        setWeekStartIndex(start);
        setWeekEndIndex(end);
        setTabValue(1); // to week view
    }

    const handleClickDay = (index) => {
        setDayIndex(index);
        setTabValue(2);
    }

    const setDayArray = (newArray) => {
        setArrayOfDays(newArray);
    }

    const setMonth = (newMonth) => {
        setMonthIndex(newMonth);
    }

    const setYear = (newYear) => {
        setCurrYear(newYear);
    }

    return (
        <div className="App">
            <NavBar name={props.auth.isEmpty ? "User" : profile.firstName} calendars={props.auth.isEmpty ? []:props.calendars}
                    auth={props.auth} />
            {
                // pass in array of calendars loaded from user's profile
                // pass in function that displays current calendar
            }
            
            <Grid item xs={12} style={{marginTop: '64px'}} />
            <Box sx={{ width: '100%', bgcolor: '#220f49', borderTop: '2px solid #8C25FF'}}>
                <Tabs value={tabValue} onChange={handleTabChange} >

                    <Tab label="Month"  style={{color: '#ffffff'}}  {...tabProps(0)} />
                    <Tab label="Week"  style={{color: '#ffffff'}}  {...tabProps(1)} />
                    <Tab label="Day"  style={{color: '#ffffff'}}  {...tabProps(2)} />
                    {/* <Tab label="State Data"  style={{color: '#ffffff'}}  {...tabProps(3)} /> */}

                </Tabs>

                {
                    // TAB PANEL FOR MONTH
                }
                <TabPanel value={tabValue} index={0}>
                    <MonthCalendar month={monthIndex} year={currYear} dayArray={arrayOfDays} setDayArray={setDayArray} setMonth={setMonth} setYear={setYear} handleClickWeek={handleClickWeek} handleClickDay={handleClickDay} blocks={props.blocks} />
                </TabPanel>

                {
                    // TAB PANEL FOR WEEK
                }
                <TabPanel value={tabValue} index={1}>
                    <WeekCalendar month={monthIndex} year={currYear} dayArray={arrayOfDays} startWeekIndex={weekStartIndex} endWeekIndex={weekEndIndex} setMonth={setMonth} setYear={setYear} handleClickDay={handleClickDay} blocks={props.blocks} />
                </TabPanel>

                {
                    // TAB PANEL FOR DAY
                }
                <TabPanel value={tabValue} index={2}>
                    <DayCalendar 
                        day={today} month={monthIndex} year={currYear} 
                        dayArray={arrayOfDays} startWeekIndex={weekStartIndex} 
                        endWeekIndex={weekEndIndex} setMonth={setMonth} 
                        setYear={setYear} dayIndex={dayIndex} blocks={props.blocks} //updateBlocks={updateBlocks}
                    />
                </TabPanel>

                {
                    // TAB PANEL FOR STATE DATA
                }
                {/* <TabPanel value={tabValue} index={3}>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        First Name: {profile.firstName}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Last Name: {profile.lastName}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Username: {profile.username}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Email: {profile.email}
                    </Typography>
                </TabPanel> */}

            </Box>

            <Grid item xs={4} sx={{ display: {xs: 'inline-flex', sm: 'none'} }} />
            <Grid item xs={4} sx={{ display: {xs: 'inline-flex', sm: 'none' }}} style={{position: 'fixed', bottom: 0, marginBottom: '10px', zIndex: 2000}}>
                <IconButton style={{backgroundColor: '#8C52FF', marginLeft: '-70px', marginRight: '10px', borderRadius: '25px', marginBottom: '12px'}} size="medium" onClick={() => setTabValue(0)}>
                    <CalendarMonthIcon style={{color: '#ffffff', fontSize: 'inherit'}} />
                </IconButton>
                <IconButton style={{backgroundColor: '#8C52FF', marginRight: '10px', borderRadius: '25px', marginBottom: '12px'}} size="medium" onClick={() => setTabValue(1)}>
                    <CalendarViewWeekIcon style={{color: '#ffffff', fontSize: 'inherit'}} />
                </IconButton>
                <IconButton style={{backgroundColor: '#8C52FF', marginRight: '10px', borderRadius: '25px', marginBottom: '12px'}} size="medium" onClick={() => setTabValue(2)}>
                    <ViewDay style={{color: '#ffffff', fontSize: 'inherit'}} />
                </IconButton>
            </Grid>
            <Grid item xs={4} sx={{ display: {xs: 'inline-flex', sm: 'none'} }} />

            <Grid item xs={4} sx={{ display: {xs: 'inline-flex', sm: 'none'} }} />
            <Grid item xs={4} sx={{ display: {xs: 'inline-flex', sm: 'none' }}} alignItems="center" style={{position: 'fixed', bottom: 0, marginBottom: '10px', zIndex: 2000}}>
                <div style={{ width: '40px', height: '3px', backgroundColor: tabValue === 0 ? '#8C52FF' : 'transparent', marginLeft: '-70px', marginRight: '10px', marginTop: '-18px' }}></div>
                <div style={{ width: '40px', height: '3px', backgroundColor: tabValue === 1 ? '#8C52FF' : 'transparent', marginRight: '10px', marginTop: '-18px' }}></div>
                <div style={{ width: '40px', height: '3px', backgroundColor: tabValue === 2 ? '#8C52FF' : 'transparent', marginTop: '-18px' }}></div>
            </Grid>
            <Grid item xs={4} sx={{ display: {xs: 'inline-flex', sm: 'none'} }} />
            
        </div>
    );
}

const mapStateToProps = (state) => {
    if (!state.firebase.auth.isEmpty) {
        if (flags.personalBlockFlag && state.firestore.ordered.blocks) {
            state.blocks = state.firestore.ordered.blocks;
        }
    }
    console.log(state);
    return {
        blocks: state.blocks,
        auth: state.firebase.auth,
        calendars: state.firestore.ordered.calendars
    }
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'users',
                doc: getFirebase().auth().currentUser ? getFirebase().auth().currentUser.uid : 'kSwQeeRaTzkMfdgsNR0v',
                subcollections: [
                    {collection: 'blocks'}
                ],
                storeAs: 'blocks'
            },
            {
                collection: 'users',
                doc: getFirebase().auth().currentUser ? getFirebase().auth().currentUser.uid : 'kSwQeeRaTzkMfdgsNR0v',
                subcollections: [
                    {collection: 'calendars'}
                ],
                storeAs: 'calendars'
            },
        ];
    }),
    connect(mapStateToProps)
)(Dashboard);

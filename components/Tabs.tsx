import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import { makeStyles, Tab } from '@material-ui/core'

export interface TabItem {
    label: string;
    value: string;
    content: React.ReactNode;
}

interface TabPanelProps {
    index: string | number;
    value: string | number;
    isHidden: boolean;
    children: React.ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    currentTab: string;
    onTabChange: (_: React.ChangeEvent<{}>, newValue: string) => void;
}

const useStyles = makeStyles((theme) => ({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        flexShrink: 0,
    },
}))

export const VerticalTabs = ({ tabs, currentTab, onTabChange }: TabsProps) => {
    const classes = useStyles()

    const { tabItems, tabPanels } = tabs.reduce<{
        tabItems: React.ReactNodeArray
        tabPanels: React.ReactNodeArray
    }>((accumulator, tab, currentIndex) => {
        const { content, label, value } = tab

        accumulator.tabItems.push(
            <Tab key={value} label={label} value={value} {...a11yProps(currentIndex)} />
        )

        accumulator.tabPanels.push(
            <TabPanel
                key={value}
                value={value}
                isHidden={value !== currentTab}
                index={currentIndex}
            >
                {content}
            </TabPanel>
        )
        return accumulator
    }, {
        tabItems: [],
        tabPanels: []
    })

    return (
        <section>
            <Tabs
                orientation='vertical'
                value={currentTab}
                onChange={onTabChange}
                aria-label='Author Top Stories'
                className={classes.tabs}
            >
                {tabItems}
            </Tabs>
            {tabPanels}
        </section>
    )
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, isHidden, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={isHidden}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {isHidden ? null : <div>{children}</div>}
        </div>
    )
}

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}
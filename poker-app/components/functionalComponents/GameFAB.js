import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import { FAB, Portal, Provider } from 'react-native-paper';
import TagDialog from '../DialogsAndSnackbars/TagDialog';
import ActionDialog from '../DialogsAndSnackbars/ActionDialog'
import { GameSubscriber } from '../../DataStore/GameStore';

export default function GameFAB(props) {
    const [open, setOpen] = useState(false);
    const [openAddTag, setOpenAddTag] = useState(false);
    const [openAddAction, setOpenAddAction] = useState(false);

    const _openTagDialog = () => setOpenAddTag(true);
    const _closeTagDialog = () => setOpenAddTag(false);

    const _openActionDialog = () => setOpenAddAction(true);
    const _closeActionDialog = () => setOpenAddAction(false);

    const _onStateChange = () => setOpen(!open);

    return (
        <GameSubscriber>
            {({ state }, { resetLiveGame, saveAllGames }) => (
                <Provider>
                    <Portal>
                        <FAB.Group
                            style={styles.fab}
                            open={open}
                            label='Options'
                            icon={open ? 'chevron-down' : 'chevron-up'}
                            actions={[
                                { icon: 'restart', color: 'red', label: 'Discard Game', onPress: () => { resetLiveGame(); props.reload();}  },
                                { icon: 'tag-plus', color: 'blue' ,label: 'Add Tag', onPress: () => { _openTagDialog(); console.log("opening?.", openAddTag) } },
                                { icon: 'plus-circle', color: 'blue' ,label: 'Add Action', onPress: () => {  _openActionDialog() ;console.log('peep pewww'); } },
                                { icon: 'content-save-all', color: 'green' ,label: 'Save', onPress: () => {saveAllGames(); resetLiveGame(); props.reload().then(() => { props.goHome() }) } },
                            ]}
                            onStateChange={_onStateChange}
                            onPress={() => {
                                if (open) {
                                    // do something if the speed dial is open
                                }
                            }}



                        />


                    </Portal>
                    <TagDialog isOpen={openAddTag} open={_openTagDialog} close={_closeTagDialog}></TagDialog>
                    <ActionDialog isOpen={openAddAction} open={_openActionDialog} close={_closeActionDialog}></ActionDialog>

                </Provider>
            )}
        </GameSubscriber>


    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 3,
        right: -5,
        bottom: -5,
        color: "black"

    },
})

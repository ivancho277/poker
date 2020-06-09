import React, { useState, useEffect } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

export default function GameFAB(props) {
    const [open, setOpen] = useState(false);


    _onStateChange = () => setOpen(open);

    return (
        <Provider>
            <Portal>
                <FAB
                    open={open}
                    icon={open ? 'calendar-today' : 'plus'}
                    actions={[
                        { icon: 'plus', label: 'Ignore for now', onPress: () => console.log('Pressed add') },
                        { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star') },
                        { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
                        { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
                    ]}
                    onStateChange={_onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}



                />
            </Portal>
        </Provider>
    )
}
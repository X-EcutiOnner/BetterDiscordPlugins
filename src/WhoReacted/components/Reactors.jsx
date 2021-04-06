import React from 'react';
import { WebpackModules } from '@zlibrary';

const Flux = WebpackModules.getByProps('Store', 'connectStores');
const ReactionStore = WebpackModules.getByProps('getReactions', '_changeCallbacks');
const VoiceUserSummaryItem = WebpackModules.find(m => m?.default?.displayName === 'VoiceUserSummaryItem').default;

const Reactors = ({ count, max, users, userId, showBot, size }) => {
    const filteredUsers = users.filter(user => user.id != userId && (showBot || user.bot !== true));
    const filtered = users.length - filteredUsers.length;

    function renderMoreUsers(text, className) {
        return (
            <div className={`${className} bd-who-reacted-more-reactors`}>
                +{1 + count - max - filtered}
            </div>
        );
    }

    return (
        <VoiceUserSummaryItem
            className={`bd-who-reacted-reactors bd-who-reacted-size-${size}px`}
            max={max}
            users={filteredUsers}
            renderMoreUsers={renderMoreUsers}
        />
    );
};

export default Flux.connectStores([ReactionStore], ({ message, emoji }) => ({
    users: Object.values(ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ?? {})
}))(Reactors);

const fs = require('fs');
const path = require('path');

const scriptLoader = require('./script-loader');
const Script = scriptLoader(path.join(__dirname, '..', 'graylog-rocketchat.hooks.js'));


const getRequest = (filename) => {
    const src = fs.readFileSync(path.join(__dirname, 'resources', filename), 'utf8');
    let content = JSON.parse(src);
    return {request:{content: content}};
};


test('Handles dummy alert', () => {
    const response = new Script().process_incoming_request(getRequest('dummy-alert.json'));
    expect(response.content.text).toBe('Dummy alert to test notifications');
});
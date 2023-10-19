import React from 'react';
import ReactDOM from 'react-dom';
import {  Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<BrowserRouter>
					<Switch>
						<Route path={`/`} component={AdminLayout} />
						<Redirect from='/' to='/admin' />
					</Switch>
				</BrowserRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);

// Chakra imports
import { Box } from '@chakra-ui/react';
// Layout components
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';

// Custom Chakra theme
export default function Dashboard(props) {
	// states and functions
	// functions for changing the states from components
	const shouldGetRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			}
		});
	};
	
	
	return (
		<Box>
			<Box>
				<Box
					minHeight='100vh'
					height='100%'
					overflow='auto'
					maxHeight='100%'
					w={{ base: '100%' }}
					maxWidth={{ base: '100%' }}
					transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
					transitionDuration='.2s, .2s, .35s'
					transitionProperty='top, bottom, width'
					transitionTimingFunction='linear, linear, ease'>
						{shouldGetRoute() ? (
							<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
								<Switch>
									{getRoutes(routes)}
									<Redirect from='/' to='/admin/default' />
								</Switch>
							</Box>
						) : null}
					</Box>
			</Box>
		</Box>
	);
}

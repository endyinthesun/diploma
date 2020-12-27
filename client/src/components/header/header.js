import React, { Component } from 'react';
import cn from 'classnames';

import './header.scss'

export default class Header extends Component {

	render () {
		const {userName, className, renderIcon, rating, achievements,signup} = this.props

		return (
			<div className={cn('Header', className)}>
				<div className='Header-Body'>
					<div className='flex-1 d-flex flex-row justify-content-start align-items-center'>
						{renderIcon && renderIcon()}
						<div className='Header-Title'>
							СИСТЕМА
							ОЦІНЮВАННЯ
							ВИКЛАДАЧІВ
						</div>
					</div>
					<div className='flex-1 d-flex flex-row justify-content-end align-items-center' >
						{this.props.premision === '1' || this.props.premision === '2' ?
							<div className='flex-1 d-flex flex-row justify-content-end align-items-center Header-Link'
							     onClick={(() => achievements())}
							>
								Діяльність
							</div>: ''}


							<div className='flex-1 d-flex flex-row justify-content-end align-items-center Header-Link'
						      onClick={(() => rating())}
						>
							Рейтинг
						</div>

						{this.props.premision === '1' ?
							<div className='flex-1 d-flex flex-row justify-content-end align-items-center Header-Link'
						      onClick={(() => signup())}
						>
							Реєстрація
						</div> : ''}
					</div>
					<div className='flex-1 d-flex flex-row justify-content-end align-items-center'>
						{userName && (
							<div className='Header-UserName'>
								{userName}
							</div>
						)}
						<a className='btn btn-primary Header-ExitBtn' href={'http://localhost:3000/login/'}>
							Вийти
						</a>
					</div>
				</div>
			</div>
		)
	}
}
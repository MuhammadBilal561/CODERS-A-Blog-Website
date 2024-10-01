<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress1' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '5E_s2!5&X-E9GS{EA TGNcL|S<zdEG2n:*j=60Z=39.g_,Nhd[FJ4So=Z|Vsfr&F' );
define( 'SECURE_AUTH_KEY',  'D]Jgc{9lxXfK8$/z_!ly#C|NBNq)6PWu<?q9{D]8iv,;u1k2/?V]z|~-of)SrB1@' );
define( 'LOGGED_IN_KEY',    'VUU&<^(G)Y~?AGK>u*`&3d9O]mM!.0lMa:<1X(,%HY~dYhjC:Y|bYZjx()^qLk3&' );
define( 'NONCE_KEY',        'EjrxsOOjEc@}N9]4PZct)q37OL7G:WxIjCa6dUPDzU%lc+||] .^? *0P7!d~3|/' );
define( 'AUTH_SALT',        'b_r^BT?O)3ApIsq7*sH$^zR.27wB;G`WANjo=ue>k*7o+XP?wgTks!xM~R4f*aO0' );
define( 'SECURE_AUTH_SALT', ':fu!`ty- U5IsnG;qEbShU4SlLEw6-.iS~ylYI(`U?L6+&1GG_%Kuy3StD|Z15:T' );
define( 'LOGGED_IN_SALT',   'E)1Rt pG=J9Ku|P~j?k8ojmtl_k_suO=$XHsZLIWbo^e)Y[>2k#=3)?NtzlPv]k/' );
define( 'NONCE_SALT',       'W5P(ue2@|/xF7zl0cApM`{<e6voR=S.sG=YULF|c;`pY1nw6?x8Z!Co%26*+z|Nf' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

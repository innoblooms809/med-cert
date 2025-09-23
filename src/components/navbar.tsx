"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";
import SearchBar from "./searchbar";
import { CartContext } from "./cartContext";

interface NavbarProps {
  dict: {
    Navheader: { [key: string]: string };
  };
}

const NavBar = ({ dict }: NavbarProps) => {
  const { cartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {/* Hamburger */}
          <li className={styles.menuButton}>
            <button type="button" onClick={toggleMenu}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </li>

          <li className={styles.logo}>
            <Link href="/Med-cert/">
              <img
                src="/Med-cert/med-cert-logo.jpg"
                alt="med-cert-logo"
                width={160}
              />
            </Link>
          </li>

          <li className={styles.categoriesButton}>
            <button type="button">{dict.Navheader.categories}</button>
          </li>

          <SearchBar dict={dict} />

          <li className={styles.searchButton}>
            <button type="button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>

          <li className={styles.teachOnUdemyButton}>
            <Link href="/mockquiz" className={styles.link}>
              <button type="button">{dict.Navheader.getCertified}</button>
            </Link>
          </li>

          <li className={styles.cartButton}>
            <Link href="/cart">
              <button type="button" className={styles.cartButton}>
                {cartItems.length > 0 && (
                  <span className={styles.cartCount}>{cartItems.length}</span>
                )}
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </Link>
          </li>

          <li className={styles.loginButton}>
            <Link href="/login" className={styles.link}>
              <button type="button">{dict.Navheader.login}</button>
            </Link>
          </li>

          <li className={styles.signupButton}>
            <Link href="/signup" className={styles.link}>
              <button type="button">{dict.Navheader.signup}</button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <button className={styles.closeBtn} onClick={toggleMenu}>
            ✖
          </button>
          <ul>
            <li>
              <Link href="/categories" onClick={toggleMenu}>
                {dict.Navheader.categories}
              </Link>
            </li>
            <li>
              <Link href="/mockquiz" onClick={toggleMenu}>
                {dict.Navheader.getCertified}
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={toggleMenu}>
                {dict.Navheader.login}
              </Link>
            </li>
            <li>
              <Link href="/signup" onClick={toggleMenu}>
                {dict.Navheader.signup}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;

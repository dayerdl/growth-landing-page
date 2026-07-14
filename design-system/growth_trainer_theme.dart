import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Growth Trainer design system — Flutter theme.
/// Copy this file into your app and apply via `GrowthTrainerTheme.dark`.
abstract final class GrowthTrainerColors {
  static const Color accent = Color(0xFF69F0AE);
  static const Color accentSecondary = Color(0xFF38BDF8);
  static const Color accentDark = Color(0xFF2A6046);
  static const Color accentPressed = Color(0xFF4FD89A);
  static const Color accentOn = Color(0xFF060608);

  static const Color background = Color(0xFF060608);
  static const Color backgroundElevated = Color(0xFF0F0F14);
  static const Color backgroundCard = Color(0xFF14141C);
  static const Color backgroundInput = Color(0xFF1A1A24);

  static const Color text = Color(0xFFF4F4F7);
  static const Color textMuted = Color(0xFF9A9AAD);
  static const Color textSubtle = Color(0xFF6B6B7D);

  static const Color border = Color(0x14FFFFFF);
  static const Color borderStrong = Color(0x24FFFFFF);
  static const Color borderAccent = Color(0x5969F0AE);

  static const Color success = accent;
  static const Color warning = Color(0xFFFBBF24);
  static const Color error = Color(0xFFF87171);
  static const Color info = accentSecondary;

  static const LinearGradient brandGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [accent, accentSecondary],
  );
}

abstract final class GrowthTrainerSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 12;
  static const double base = 16;
  static const double lg = 20;
  static const double xl = 24;
  static const double xxl = 32;
  static const double xxxl = 48;
}

abstract final class GrowthTrainerRadius {
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 24;
  static const BorderRadius card = BorderRadius.all(Radius.circular(xl));
  static const BorderRadius button = BorderRadius.all(Radius.circular(9999));
  static const BorderRadius input = BorderRadius.all(Radius.circular(md));
}

abstract final class GrowthTrainerTheme {
  static ThemeData get dark {
    final textTheme = TextTheme(
      displayLarge: GoogleFonts.bebasNeue(
        fontSize: 48,
        letterSpacing: 1.5,
        color: GrowthTrainerColors.text,
        height: 1.05,
      ),
      displayMedium: GoogleFonts.bebasNeue(
        fontSize: 36,
        letterSpacing: 1.2,
        color: GrowthTrainerColors.text,
        height: 1.1,
      ),
      headlineLarge: GoogleFonts.inter(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: GrowthTrainerColors.text,
      ),
      headlineMedium: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: GrowthTrainerColors.text,
      ),
      titleLarge: GoogleFonts.inter(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: GrowthTrainerColors.text,
      ),
      titleMedium: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: GrowthTrainerColors.text,
      ),
      bodyLarge: GoogleFonts.inter(
        fontSize: 16,
        color: GrowthTrainerColors.text,
        height: 1.6,
      ),
      bodyMedium: GoogleFonts.inter(
        fontSize: 14,
        color: GrowthTrainerColors.textMuted,
        height: 1.6,
      ),
      bodySmall: GoogleFonts.inter(
        fontSize: 12,
        color: GrowthTrainerColors.textSubtle,
        height: 1.5,
      ),
      labelLarge: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: GrowthTrainerColors.accentOn,
      ),
    );

    final colorScheme = const ColorScheme.dark(
      primary: GrowthTrainerColors.accent,
      onPrimary: GrowthTrainerColors.accentOn,
      secondary: GrowthTrainerColors.accentSecondary,
      onSecondary: GrowthTrainerColors.accentOn,
      surface: GrowthTrainerColors.backgroundCard,
      onSurface: GrowthTrainerColors.text,
      error: GrowthTrainerColors.error,
      onError: GrowthTrainerColors.text,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: GrowthTrainerColors.background,
      colorScheme: colorScheme,
      textTheme: textTheme,
      fontFamily: GoogleFonts.inter().fontFamily,
      appBarTheme: AppBarTheme(
        backgroundColor: GrowthTrainerColors.background,
        foregroundColor: GrowthTrainerColors.text,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.bebasNeue(
          fontSize: 20,
          letterSpacing: 1.2,
          color: GrowthTrainerColors.text,
        ),
      ),
      cardTheme: CardTheme(
        color: GrowthTrainerColors.backgroundCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: GrowthTrainerRadius.card,
          side: const BorderSide(color: GrowthTrainerColors.border),
        ),
        margin: const EdgeInsets.all(GrowthTrainerSpacing.base),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: GrowthTrainerColors.accent,
          foregroundColor: GrowthTrainerColors.accentOn,
          elevation: 0,
          padding: const EdgeInsets.symmetric(
            horizontal: GrowthTrainerSpacing.lg,
            vertical: GrowthTrainerSpacing.md,
          ),
          shape: const RoundedRectangleBorder(
            borderRadius: GrowthTrainerRadius.button,
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: GrowthTrainerColors.text,
          side: const BorderSide(color: GrowthTrainerColors.borderStrong),
          padding: const EdgeInsets.symmetric(
            horizontal: GrowthTrainerSpacing.lg,
            vertical: GrowthTrainerSpacing.md,
          ),
          shape: const RoundedRectangleBorder(
            borderRadius: GrowthTrainerRadius.button,
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: GrowthTrainerColors.backgroundInput,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: GrowthTrainerSpacing.base,
          vertical: GrowthTrainerSpacing.md,
        ),
        border: OutlineInputBorder(
          borderRadius: GrowthTrainerRadius.input,
          borderSide: const BorderSide(color: GrowthTrainerColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: GrowthTrainerRadius.input,
          borderSide: const BorderSide(color: GrowthTrainerColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: GrowthTrainerRadius.input,
          borderSide: const BorderSide(color: GrowthTrainerColors.accent),
        ),
        hintStyle: GoogleFonts.inter(
          color: GrowthTrainerColors.textSubtle,
          fontSize: 14,
        ),
        labelStyle: GoogleFonts.inter(
          color: GrowthTrainerColors.textMuted,
          fontSize: 14,
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: GrowthTrainerColors.border,
        thickness: 1,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: GrowthTrainerColors.backgroundElevated,
        selectedItemColor: GrowthTrainerColors.accent,
        unselectedItemColor: GrowthTrainerColors.textMuted,
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
      chipTheme: ChipThemeData(
        backgroundColor: GrowthTrainerColors.accent.withValues(alpha: 0.12),
        labelStyle: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w500,
          color: GrowthTrainerColors.accent,
        ),
        side: const BorderSide(color: GrowthTrainerColors.borderAccent),
        shape: const RoundedRectangleBorder(
          borderRadius: GrowthTrainerRadius.button,
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: GrowthTrainerSpacing.md,
          vertical: GrowthTrainerSpacing.xs,
        ),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: GrowthTrainerColors.backgroundCard,
        contentTextStyle: GoogleFonts.inter(color: GrowthTrainerColors.text),
        shape: RoundedRectangleBorder(
          borderRadius: GrowthTrainerRadius.card,
          side: const BorderSide(color: GrowthTrainerColors.border),
        ),
        behavior: SnackBarBehavior.floating,
      ),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: GrowthTrainerColors.accent,
      ),
    );
  }
}

/// Usage:
/// ```dart
/// MaterialApp(
///   theme: GrowthTrainerTheme.dark,
///   ...
/// );
/// ```
